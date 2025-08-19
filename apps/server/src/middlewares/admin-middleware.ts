import { o } from '../lib/orpc';
import { ORPCError } from '@orpc/server';

export const adminMiddleware = o.middleware(async ({ context, next }) => {
  if (!context.session) {
    throw new ORPCError('UNAUTHORIZED', {
      message: 'Authentication required'
    });
  }

  if (context.session.user.role !== 'ADMIN') {
    throw new ORPCError('FORBIDDEN', {
      message: 'You are not authorized to access this resource'
    });
  }

  return next({
    context: {
      ...context
    }
  });
});
