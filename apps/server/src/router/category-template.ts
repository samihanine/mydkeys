import { o } from '../lib/orpc';
import { adminMiddleware } from '../middlewares/admin-middleware';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { categoryTemplate, db, eq, insertCategoryTemplateSchema, updateCategoryTemplateSchema } from '@repo/database';
import { z } from 'zod';

const getAll = o.handler(async () => {
  const categoryTemplates = await db.query.categoryTemplate.findMany({
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return categoryTemplates;
});

const create = o
  .use(adminMiddleware)
  .input(insertCategoryTemplateSchema)
  .handler(async ({ input }) => {
    const [inserted] = await db.insert(categoryTemplate).values(input).returning();

    if (!inserted) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Error while creating categoryTemplate' });
    }

    return inserted;
  });

const getById = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const found = await db.query.categoryTemplate.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!found) {
      throw new ORPCError('NOT_FOUND', { message: 'CategoryTemplate not found' });
    }

    return found;
  });

const update = o
  .use(adminMiddleware)
  .input(updateCategoryTemplateSchema)
  .handler(async ({ input }) => {
    const [updated] = await db.update(categoryTemplate).set(input).where(eq(categoryTemplate.id, input.id)).returning();

    if (!updated) {
      throw new ORPCError('NOT_FOUND', { message: 'CategoryTemplate not found' });
    }

    return updated;
  });

const destroy = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    await db.delete(categoryTemplate).where(eq(categoryTemplate.id, input.id));

    return null;
  });

const getByDomainId = o
  .use(projectMiddleware)
  .input(z.object({ domainId: z.string() }))
  .handler(async ({ input }) => {
    const results = await db.query.categoryTemplate.findMany({
      where: eq(categoryTemplate.domainId, input.domainId)
    });

    return results;
  });

export const categoryTemplateRouter = {
  getAll,
  create,
  getById,
  update,
  destroy,
  getByDomainId
};
