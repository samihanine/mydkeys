import { o } from '../lib/orpc';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { and, db, eq } from '@repo/database';
import { category, insertCategorySchema, updateCategorySchema } from '@repo/database';
import { z } from 'zod';

const create = o
  .use(projectMiddleware)
  .input(insertCategorySchema.omit({ id: true, projectId: true }))
  .handler(async ({ input, context }) => {
    const [newCategory] = await db
      .insert(category)
      .values({
        ...input,
        projectId: context.project.id
      })
      .returning();

    if (!newCategory) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to create category' });
    }

    return newCategory;
  });

const update = o
  .use(projectMiddleware)
  .input(updateCategorySchema)
  .handler(async ({ input, context }) => {
    const [updatedCategory] = await db
      .update(category)
      .set({
        ...input,
        updatedAt: new Date().toISOString()
      })
      .where(and(eq(category.id, input.id), eq(category.projectId, context.project.id)))
      .returning();

    if (!updatedCategory) {
      throw new ORPCError('NOT_FOUND', { message: 'Category not found' });
    }

    return updatedCategory;
  });

const destroy = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    await db.delete(category).where(and(eq(category.id, input.id), eq(category.projectId, context.project.id)));

    return { success: true };
  });

const getById = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    const foundCategory = await db.query.category.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!foundCategory) {
      throw new ORPCError('NOT_FOUND', { message: 'Category not found' });
    }

    return foundCategory;
  });

const getByCurrentProject = o.use(projectMiddleware).handler(async ({ context }) => {
  const categorys = await db.query.category.findMany({
    where(fields, operators) {
      return operators.eq(fields.projectId, context.project.id);
    },
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return categorys;
});

export const categoryRouter = {
  create,
  update,
  destroy,
  getById,
  getByCurrentProject
};
