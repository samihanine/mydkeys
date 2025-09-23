import { o } from '../lib/orpc';
import { adminMiddleware } from '../middlewares/admin-middleware';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { and, db, eq } from '@repo/database';
import { category, insertCategorySchema, updateCategorySchema } from '@repo/database';
import { z } from 'zod';

const create = o
  .use(adminMiddleware)
  .input(insertCategorySchema.omit({ id: true }))
  .handler(async ({ input }) => {
    const [newCategory] = await db
      .insert(category)
      .values({
        ...input
      })
      .returning();

    if (!newCategory) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to create category' });
    }

    return newCategory;
  });

const update = o
  .use(adminMiddleware)
  .input(updateCategorySchema)
  .handler(async ({ input }) => {
    const [updatedCategory] = await db
      .update(category)
      .set({
        ...input,
        updatedAt: new Date().toISOString()
      })
      .where(and(eq(category.id, input.id)))
      .returning();

    if (!updatedCategory) {
      throw new ORPCError('NOT_FOUND', { message: 'Category not found' });
    }

    return updatedCategory;
  });

const destroy = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    await db.delete(category).where(and(eq(category.id, input.id)));

    return { success: true };
  });

const getById = o
  .use(adminMiddleware)
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

const getAll = o.use(projectMiddleware).handler(async ({ context }) => {
  const categories = await db.query.category.findMany({
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return categories;
});

const getByDomainId = o
  .use(projectMiddleware)
  .input(z.object({ domainId: z.string() }))
  .handler(async ({ input, context }) => {
    const categories = await db.query.category.findMany({
      where: eq(category.domainId, input.domainId)
    });

    return categories;
  });

export const categoryRouter = {
  create,
  update,
  destroy,
  getById,
  getAll,
  getByDomainId
};
