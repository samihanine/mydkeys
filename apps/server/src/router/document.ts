import { o } from '../lib/orpc';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { and, db, eq } from '@repo/database';
import { document, insertDocumentSchema, updateDocumentSchema } from '@repo/database';
import { z } from 'zod';

const create = o
  .use(projectMiddleware)
  .input(insertDocumentSchema.omit({ id: true, projectId: true }))
  .handler(async ({ input, context }) => {
    const [newDocument] = await db
      .insert(document)
      .values({
        ...input,
        projectId: context.project.id
      })
      .returning();

    if (!newDocument) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to create document' });
    }

    return newDocument;
  });

const update = o
  .use(projectMiddleware)
  .input(updateDocumentSchema)
  .handler(async ({ input, context }) => {
    const [updatedDocument] = await db
      .update(document)
      .set({
        ...input,
        updatedAt: new Date().toISOString()
      })
      .where(and(eq(document.id, input.id), eq(document.projectId, context.project.id)))
      .returning();

    if (!updatedDocument) {
      throw new ORPCError('NOT_FOUND', { message: 'Document not found' });
    }

    return updatedDocument;
  });

const destroy = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    await db.delete(document).where(and(eq(document.id, input.id), eq(document.projectId, context.project.id)));

    return { success: true };
  });

const getById = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    const foundDocument = await db.query.document.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!foundDocument) {
      throw new ORPCError('NOT_FOUND', { message: 'Document not found' });
    }

    return foundDocument;
  });

const getAll = o.use(projectMiddleware).handler(async ({ context }) => {
  const documents = await db.query.document.findMany({
    where(fields, operators) {
      return operators.eq(fields.projectId, context.project.id);
    },
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return documents;
});

const getByMemberTemplateId = o
  .use(projectMiddleware)
  .input(z.object({ memberTemplateId: z.string() }))
  .handler(async ({ input, context }) => {
    const documentMemberTemplates = await db.query.documentMemberTemplate.findMany({
      where(fields, operators) {
        return operators.eq(fields.memberTemplateId, input.memberTemplateId);
      }
    });

    const documents = await db.query.document.findMany({
      where(fields, operators) {
        return operators.and(
          operators.eq(fields.projectId, context.project.id)
          /*
          operators.inArray(
            fields.documentTemplateId,
            documentMemberTemplates.map((s) => s.documentTemplateId)
          )
          */
        );
      }
    });

    return documents;
  });

export const documentRouter = {
  create,
  update,
  destroy,
  getById,
  getAll,
  getByMemberTemplateId
};
