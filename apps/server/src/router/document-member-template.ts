import { o } from '../lib/orpc';
import { adminMiddleware } from '../middlewares/admin-middleware';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import {
  db,
  documentMemberTemplate,
  eq,
  insertDocumentMemberTemplateSchema,
  updateDocumentMemberTemplateSchema
} from '@repo/database';
import { z } from 'zod';

const getAll = o.handler(async ({ context }) => {
  const documentMemberTemplates = await db.query.documentMemberTemplate.findMany({
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return documentMemberTemplates;
});

const create = o
  .use(adminMiddleware)
  .input(insertDocumentMemberTemplateSchema)
  .handler(async ({ input, context }) => {
    const [inserted] = await db.insert(documentMemberTemplate).values(input).returning();

    if (!inserted) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Error while creating documentMemberTemplate' });
    }

    return inserted;
  });

const getById = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const documentMemberTemplate = await db.query.documentMemberTemplate.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!documentMemberTemplate) {
      throw new ORPCError('NOT_FOUND', { message: 'DocumentMemberTemplate not found' });
    }

    return documentMemberTemplate;
  });

const update = o
  .use(adminMiddleware)
  .input(updateDocumentMemberTemplateSchema)
  .handler(async ({ input }) => {
    const [updated] = await db
      .update(documentMemberTemplate)
      .set(input)
      .where(eq(documentMemberTemplate.id, input.id))
      .returning();

    if (!updated) {
      throw new ORPCError('NOT_FOUND', { message: 'DocumentMemberTemplate not found' });
    }

    return updated;
  });

const destroy = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    await db.delete(documentMemberTemplate).where(eq(documentMemberTemplate.id, input.id));

    return null;
  });

const getByDomainId = o
  .use(projectMiddleware)
  .input(z.object({ domainId: z.string() }))
  .handler(async ({ input }) => {
    const documentMemberTemplates = await db.query.documentMemberTemplate.findMany({
      where: eq(documentMemberTemplate.domainId, input.domainId)
    });

    return documentMemberTemplates;
  });

export const documentMemberTemplateRouter = {
  getAll,
  create,
  getById,
  update,
  destroy,
  getByDomainId
};
