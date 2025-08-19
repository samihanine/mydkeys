import { o } from '../lib/orpc';
import { ORPCError } from '@orpc/server';

export const authMiddleware = o.middleware(async ({ context, next }) => {
  if (!context.session?.user) {
    throw new ORPCError('UNAUTHORIZED');
  }
  return next({
    context: {
      session: context.session
    }
  });
});
