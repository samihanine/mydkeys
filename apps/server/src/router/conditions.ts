import { o } from '../lib/orpc';
import { adminMiddleware } from '../middlewares/admin-middleware';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { and, db, eq } from '@repo/database';
import { condition, insertConditionSchema, updateConditionSchema } from '@repo/database';
import { z } from 'zod';

const create = o
  .use(adminMiddleware)
  .input(insertConditionSchema.omit({ id: true }))
  .handler(async ({ input }) => {
    const [newCondition] = await db
      .insert(condition)
      .values({
        ...input
      })
      .returning();

    if (!newCondition) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to create condition' });
    }

    return newCondition;
  });

const update = o
  .use(adminMiddleware)
  .input(updateConditionSchema)
  .handler(async ({ input }) => {
    const [updatedCondition] = await db
      .update(condition)
      .set({
        ...input,
        updatedAt: new Date().toISOString()
      })
      .where(and(eq(condition.id, input.id)))
      .returning();

    if (!updatedCondition) {
      throw new ORPCError('NOT_FOUND', { message: 'Condition not found' });
    }

    return updatedCondition;
  });

const destroy = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    await db.delete(condition).where(and(eq(condition.id, input.id)));

    return { success: true };
  });

const getById = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    const foundCondition = await db.query.condition.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!foundCondition) {
      throw new ORPCError('NOT_FOUND', { message: 'Condition not found' });
    }

    return foundCondition;
  });

const getAll = o.use(projectMiddleware).handler(async ({ context }) => {
  const categories = await db.query.condition.findMany({
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return categories;
});

const getByCategoryId = o
  .use(projectMiddleware)
  .input(z.object({ categoryId: z.string() }))
  .handler(async ({ input, context }) => {
    const conditions = await db.query.condition.findMany({
      where: eq(condition.categoryId, input.categoryId)
    });

    return conditions;
  });

const getBySpecificationTemplateId = o
  .use(projectMiddleware)
  .input(z.object({ specificationTemplateId: z.string() }))
  .handler(async ({ input, context }) => {
    const conditions = await db.query.condition.findMany({
      where: eq(condition.specificationTemplateId, input.specificationTemplateId)
    });

    return conditions;
  });

export const conditionRouter = {
  create,
  update,
  destroy,
  getById,
  getAll,
  getByCategoryId,
  getBySpecificationTemplateId
};
