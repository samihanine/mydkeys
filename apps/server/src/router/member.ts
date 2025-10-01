import { o } from '../lib/orpc';
import { resend } from '../lib/resend';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { and, db, eq, invitation, user } from '@repo/database';
import { insertMemberSchema, member, updateMemberSchema } from '@repo/database';
import { renderInvitationEmail } from '@repo/email';
import { z } from 'zod';

const create = o
  .use(projectMiddleware)
  .input(insertMemberSchema.omit({ id: true, projectId: true }))
  .handler(async ({ input, context }) => {
    const [newMember] = await db
      .insert(member)
      .values({
        ...input,
        projectId: context.project.id
      })
      .returning();

    if (!newMember) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to create member' });
    }

    const token = crypto.randomUUID();
    const invitedTo = `${context.project.name}'s project`;
    const invitedBy = context.session?.user.name || 'Unknown';
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/invitation?token=${token}`;

    await db
      .insert(invitation)
      .values({
        memberId: newMember.id,
        invitedByMemberId: context.member.id,
        token
      })
      .returning();

    try {
      await resend.emails.send({
        from: `MyDkeys <${process.env.RESEND_FROM_EMAIL}>`,
        to: input.externalEmail!,
        subject: `Invitation to join ${invitedTo}`,
        html: renderInvitationEmail({ invitedBy, invitedTo, url })
      });
    } catch (error) {
      console.error(error);
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to send invitation email' });
    }

    return newMember;
  });

const update = o
  .use(projectMiddleware)
  .input(updateMemberSchema)
  .handler(async ({ input, context }) => {
    const [updatedMember] = await db
      .update(member)
      .set({
        ...input,
        updatedAt: new Date().toISOString()
      })
      .where(and(eq(member.id, input.id), eq(member.projectId, context.project.id)))
      .returning();

    if (!updatedMember) {
      throw new ORPCError('NOT_FOUND', { message: 'Member not found' });
    }

    return updatedMember;
  });

const destroy = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    await db.delete(member).where(and(eq(member.id, input.id), eq(member.projectId, context.project.id)));

    return { success: true };
  });

const getById = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    const foundMember = await db.query.member.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!foundMember) {
      throw new ORPCError('NOT_FOUND', { message: 'Member not found' });
    }

    return foundMember;
  });

const getByCurrentProject = o.use(projectMiddleware).handler(async ({ context }) => {
  const members = await db.query.member.findMany({
    where(fields, operators) {
      return operators.eq(fields.projectId, context.project.id);
    },
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return members;
});

const getCurrentMember = o.use(projectMiddleware).handler(async ({ context }) => {
  return context.member;
});

export const memberRouter = {
  create,
  update,
  destroy,
  getById,
  getByCurrentProject,
  getCurrentMember
};
