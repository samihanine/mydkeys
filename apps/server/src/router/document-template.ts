import { o } from '../lib/orpc';
import { adminMiddleware } from '../middlewares/admin-middleware';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { db, documentTemplate, eq, insertDocumentTemplateSchema, updateDocumentTemplateSchema } from '@repo/database';
import { z } from 'zod';

const getAll = o.handler(async ({ context }) => {
  const documentTemplates = await db.query.documentTemplate.findMany({
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return documentTemplates;
});

const create = o
  .use(adminMiddleware)
  .input(insertDocumentTemplateSchema)
  .handler(async ({ input, context }) => {
    const [inserted] = await db.insert(documentTemplate).values(input).returning();

    if (!inserted) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Error while creating documentTemplate' });
    }

    return inserted;
  });

const getById = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const documentTemplate = await db.query.documentTemplate.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!documentTemplate) {
      throw new ORPCError('NOT_FOUND', { message: 'DocumentTemplate not found' });
    }

    return documentTemplate;
  });

const update = o
  .use(adminMiddleware)
  .input(updateDocumentTemplateSchema)
  .handler(async ({ input }) => {
    const [updated] = await db.update(documentTemplate).set(input).where(eq(documentTemplate.id, input.id)).returning();

    if (!updated) {
      throw new ORPCError('NOT_FOUND', { message: 'DocumentTemplate not found' });
    }

    return updated;
  });

const destroy = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    await db.delete(documentTemplate).where(eq(documentTemplate.id, input.id));

    return null;
  });

const getByDomainId = o
  .use(projectMiddleware)
  .input(z.object({ domainId: z.string() }))
  .handler(async ({ input }) => {
    const documentTemplates = await db.query.documentTemplate.findMany({
      where: eq(documentTemplate.domainId, input.domainId)
    });

    return documentTemplates;
  });

export const documentTemplateRouter = {
  getAll,
  create,
  getById,
  update,
  destroy,
  getByDomainId
};
