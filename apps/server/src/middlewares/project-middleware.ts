import { o } from '../lib/orpc';
import { ORPCError } from '@orpc/server';
import { db } from '@repo/database';

export const projectMiddleware = o.middleware(async ({ context, next }) => {
  if (!context.session) {
    throw new ORPCError('UNAUTHORIZED', {
      message: 'Authentication required'
    });
  }

  const projectId = context.session.user.selectedProjectId;

  if (!projectId) {
    throw new ORPCError('FORBIDDEN', {
      message: 'No project selected'
    });
  }

  const stakeholderData = await db.query.stakeholder.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, context.session?.user.id || ''),
        operators.eq(fields.projectId, projectId)
      );
    }
  });

  if (!stakeholderData) {
    throw new ORPCError('FORBIDDEN', {
      message: 'Access denied to this project'
    });
  }

  const projectData = await db.query.project.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, projectId);
    }
  });

  if (!projectData) {
    throw new ORPCError('FORBIDDEN', {
      message: 'Access denied to this project'
    });
  }

  return next({
    context: {
      ...context,
      stakeholder: stakeholderData,
      project: projectData
    }
  });
});
