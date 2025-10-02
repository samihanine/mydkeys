import { o } from '../lib/orpc';
import { adminMiddleware } from '../middlewares/admin-middleware';
import { ORPCError } from '@orpc/server';
import {
  categoryTemplateDocumentTemplate,
  db,
  eq,
  insertCategoryTemplateDocumentTemplateSchema,
  updateCategoryTemplateDocumentTemplateSchema
} from '@repo/database';
import { z } from 'zod';

const getAll = o.handler(async ({ context }) => {
  const categoryTemplateDocumentTemplates = await db.query.categoryTemplateDocumentTemplate.findMany({
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return categoryTemplateDocumentTemplates;
});

const create = o
  .use(adminMiddleware)
  .input(insertCategoryTemplateDocumentTemplateSchema)
  .handler(async ({ input, context }) => {
    const [inserted] = await db.insert(categoryTemplateDocumentTemplate).values(input).returning();

    if (!inserted) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: 'Error while creating categoryTemplateDocumentTemplate'
      });
    }

    return inserted;
  });

const getById = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const categoryTemplateDocumentTemplate = await db.query.categoryTemplateDocumentTemplate.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!categoryTemplateDocumentTemplate) {
      throw new ORPCError('NOT_FOUND', { message: 'CategoryTemplateDocumentTemplate not found' });
    }

    return categoryTemplateDocumentTemplate;
  });

const update = o
  .use(adminMiddleware)
  .input(updateCategoryTemplateDocumentTemplateSchema)
  .handler(async ({ input }) => {
    const [updated] = await db
      .update(categoryTemplateDocumentTemplate)
      .set(input)
      .where(eq(categoryTemplateDocumentTemplate.id, input.id))
      .returning();

    if (!updated) {
      throw new ORPCError('NOT_FOUND', { message: 'CategoryTemplateDocumentTemplate not found' });
    }

    return updated;
  });

const destroy = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    await db.delete(categoryTemplateDocumentTemplate).where(eq(categoryTemplateDocumentTemplate.id, input.id));

    return null;
  });

const getByDomainId = o
  .use(adminMiddleware)
  .input(z.object({ domainId: z.string() }))
  .handler(async ({ input }) => {
    const categoryTemplateDocumentTemplates = await db.query.categoryTemplateDocumentTemplate.findMany({
      where: eq(categoryTemplateDocumentTemplate.domainId, input.domainId)
    });

    return categoryTemplateDocumentTemplates;
  });

const getByDocumentTemplateId = o
  .use(adminMiddleware)
  .input(z.object({ documentTemplateId: z.string() }))
  .handler(async ({ input }) => {
    const categoryTemplateDocumentTemplates = await db.query.categoryTemplateDocumentTemplate.findMany({
      where: eq(categoryTemplateDocumentTemplate.documentTemplateId, input.documentTemplateId)
    });

    return categoryTemplateDocumentTemplates;
  });

const getByCategoryTemplateId = o
  .use(adminMiddleware)
  .input(z.object({ categoryTemplateId: z.string() }))
  .handler(async ({ input }) => {
    const categoryTemplateDocumentTemplates = await db.query.categoryTemplateDocumentTemplate.findMany({
      where: eq(categoryTemplateDocumentTemplate.categoryTemplateId, input.categoryTemplateId)
    });

    return categoryTemplateDocumentTemplates;
  });

export const categoryTemplateDocumentTemplateRouter = {
  getAll,
  create,
  getById,
  update,
  destroy,
  getByDomainId,
  getByDocumentTemplateId,
  getByCategoryTemplateId
};
