import { o } from '../lib/orpc';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { and, db, eq } from '@repo/database';
import { categoryDocument, insertCategoryDocumentSchema, updateCategoryDocumentSchema } from '@repo/database';
import { z } from 'zod';

const create = o
  .use(projectMiddleware)
  .input(insertCategoryDocumentSchema.omit({ id: true, projectId: true }))
  .handler(async ({ input, context }) => {
    const [newCategoryDocument] = await db
      .insert(categoryDocument)
      .values({
        ...input,
        projectId: context.project.id
      })
      .returning();

    if (!newCategoryDocument) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to create categoryDocument' });
    }

    return newCategoryDocument;
  });

const update = o
  .use(projectMiddleware)
  .input(updateCategoryDocumentSchema)
  .handler(async ({ input, context }) => {
    const [updatedCategoryDocument] = await db
      .update(categoryDocument)
      .set({
        ...input,
        updatedAt: new Date().toISOString()
      })
      .where(and(eq(categoryDocument.id, input.id), eq(categoryDocument.projectId, context.project.id)))
      .returning();

    if (!updatedCategoryDocument) {
      throw new ORPCError('NOT_FOUND', { message: 'CategoryDocument not found' });
    }

    return updatedCategoryDocument;
  });

const destroy = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    await db
      .delete(categoryDocument)
      .where(and(eq(categoryDocument.id, input.id), eq(categoryDocument.projectId, context.project.id)));

    return { success: true };
  });

const getById = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    const foundCategoryDocument = await db.query.categoryDocument.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!foundCategoryDocument) {
      throw new ORPCError('NOT_FOUND', { message: 'CategoryDocument not found' });
    }

    return foundCategoryDocument;
  });

const getByCurrentProject = o.use(projectMiddleware).handler(async ({ context }) => {
  const categoryDocuments = await db.query.categoryDocument.findMany({
    where(fields, operators) {
      return operators.eq(fields.projectId, context.project.id);
    },
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return categoryDocuments;
});

const getByDocumentId = o
  .use(projectMiddleware)
  .input(z.object({ documentId: z.string() }))
  .handler(async ({ input, context }) => {
    const categoryDocuments = await db.query.categoryDocument.findMany({
      where(fields, operators) {
        return operators.eq(fields.documentId, input.documentId);
      }
    });

    return categoryDocuments;
  });

const getByCategoryId = o
  .use(projectMiddleware)
  .input(z.object({ categoryId: z.string() }))
  .handler(async ({ input, context }) => {
    const categoryDocuments = await db.query.categoryDocument.findMany({
      where(fields, operators) {
        return operators.eq(fields.categoryId, input.categoryId);
      }
    });

    return categoryDocuments;
  });

export const categoryDocumentRouter = {
  create,
  update,
  destroy,
  getById,
  getByCurrentProject,
  getByDocumentId,
  getByCategoryId
};
