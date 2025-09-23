import { o } from '../lib/orpc';
import { adminMiddleware } from '../middlewares/admin-middleware';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { db } from '@repo/database';
import { z } from 'zod';

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

const getAll = o.use(adminMiddleware).handler(async () => {
  const users = await db.query.user.findMany({
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });
  return users;
});

const getCurrentUsersByCurrentProject = o.use(projectMiddleware).handler(async ({ context }) => {
  const members = await db.query.member.findMany({
    where: (fields, { eq }) => eq(fields.projectId, context.project.id)
  });

  const users = await db.query.user.findMany({
    where: (fields, { inArray }) =>
      inArray(
        fields.id!,
        members.map((pu) => pu.userId!)
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
