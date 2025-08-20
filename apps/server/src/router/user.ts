import { o } from '../lib/orpc';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { db } from '@repo/database';
import { z } from 'zod';

// Pour adminProcedure, nous devrons créer un middleware admin
// Pour l'instant, utilisons projectMiddleware en attendant
const getById = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const foundUser = await db.query.user.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!foundUser) {
      throw new ORPCError('NOT_FOUND', { message: 'User not found' });
    }

    return foundUser;
  });

const getAll = o.use(projectMiddleware).handler(async () => {
  const users = await db.query.user.findMany({
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });
  return users;
});

const getCurrentUsersByCurrentProject = o.use(projectMiddleware).handler(async ({ context }) => {
  const stakeholders = await db.query.stakeholder.findMany({
    where: (fields, { eq }) => eq(fields.projectId, context.project.id)
  });

  const users = await db.query.user.findMany({
    where: (fields, { inArray }) =>
      inArray(
        fields.id!,
        stakeholders.map((pu) => pu.userId!)
      ),
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return users;
});

export const userRouter = {
  getById,
  getAll,
  getCurrentUsersByCurrentProject
};
