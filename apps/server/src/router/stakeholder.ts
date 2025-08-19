import { o } from '../lib/orpc';
import { resend } from '../lib/resend';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { and, db, eq, invitation, user } from '@repo/database';
import { insertStakeholderSchema, stakeholder, updateStakeholderSchema } from '@repo/database';
import { renderInvitationEmail } from '@repo/email';
import { z } from 'zod';

const create = o
  .use(projectMiddleware)
  .input(insertStakeholderSchema.omit({ id: true, projectId: true }))
  .handler(async ({ input, context }) => {
    const [newStakeholder] = await db
      .insert(stakeholder)
      .values({
        ...input,
        projectId: context.project.id
      })
      .returning();

    if (!newStakeholder) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to create stakeholder' });
    }

    const token = crypto.randomUUID();
    const invitedTo = `${context.project.name}'s project`;
    const invitedBy = context.session?.user.name || 'Unknown';
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/invitation?token=${token}`;

    await db
      .insert(invitation)
      .values({
        stakeholderId: newStakeholder.id,
        invitedBy: context.stakeholder.id,
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

    return newStakeholder;
  });

const update = o
  .use(projectMiddleware)
  .input(updateStakeholderSchema)
  .handler(async ({ input, context }) => {
    const [updatedStakeholder] = await db
      .update(stakeholder)
      .set({
        ...input,
        updatedAt: new Date().toISOString()
      })
      .where(and(eq(stakeholder.id, input.id), eq(stakeholder.projectId, context.project.id)))
      .returning();

    return updatedStakeholder;
  });

const destroy = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    await db
      .delete(stakeholder)
      .where(and(eq(stakeholder.id, input.id), eq(stakeholder.projectId, context.project.id)));

    return { success: true };
  });

const getById = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    const foundStakeholder = await db.query.stakeholder.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!foundStakeholder) {
      throw new ORPCError('NOT_FOUND', { message: 'Stakeholder not found' });
    }

    return foundStakeholder;
  });

const getAll = o.use(projectMiddleware).handler(async ({ context }) => {
  const stakeholders = await db.query.stakeholder.findMany({
    where(fields, operators) {
      return operators.eq(fields.projectId, context.project.id);
    },
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return stakeholders;
});

const getCurrentStakeholder = o.use(projectMiddleware).handler(async ({ context }) => {
  return context.stakeholder;
});

export const stakeholderRouter = {
  create,
  update,
  destroy,
  getById,
  getAll,
  getCurrentStakeholder
};
