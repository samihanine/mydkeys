import { o } from '../lib/orpc';
import { authMiddleware } from '../middlewares/auth-middleware';
import { ORPCError } from '@orpc/server';
import { db, eq, invitation, stakeholder } from '@repo/database';
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

    const [stakeholderData] = await db
      .update(stakeholder)
      .set({
        userId: context.session.user.id,
        metaJson: {
          image: context.session.user.image || undefined
        }
      })
      .where(eq(stakeholder.id, invitationData.stakeholderId))
      .returning();

    await db
      .update(invitation)
      .set({
        accessGrantedAt: new Date().toISOString()
      })
      .where(eq(invitation.id, invitationData.id));

    if (!stakeholderData) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to create stakeholder' });
    }

    return stakeholderData;
  });

export const invitationRouter = {
  getByToken,
  accept
};
