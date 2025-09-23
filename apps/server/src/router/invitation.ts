import { o } from '../lib/orpc';
import { authMiddleware } from '../middlewares/auth-middleware';
import { ORPCError } from '@orpc/server';
import { db, eq, invitation, member } from '@repo/database';
import z from 'zod';

const getByToken = o.input(z.object({ token: z.string() })).handler(async ({ input }) => {
  const invitationData = await db.query.invitation.findFirst({
    where: eq(invitation.token, input.token)
  });

  if (!invitationData) {
    throw new ORPCError('NOT_FOUND', { message: 'Invitation not found' });
  }

  return invitationData;
});

const accept = o
  .use(authMiddleware)
  .input(z.object({ token: z.string() }))
  .handler(async ({ input, context }) => {
    const invitationData = await db.query.invitation.findFirst({
      where: eq(invitation.token, input.token)
    });

    if (!invitationData) {
      throw new ORPCError('NOT_FOUND', { message: 'Invitation not found' });
    }

    const [memberData] = await db
      .update(member)
      .set({
        userId: context.session.user.id,
        metaJson: {
          image: context.session.user.image || undefined
        }
      })
      .where(eq(member.id, invitationData.memberId))
      .returning();

    await db
      .update(invitation)
      .set({
        accessGrantedAt: new Date().toISOString()
      })
      .where(eq(invitation.id, invitationData.id));

    if (!memberData) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to create member' });
    }

    return memberData;
  });

export const invitationRouter = {
  getByToken,
  accept
};
