import { o } from '../lib/orpc';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import {
  DocumentMemberTemplate,
  and,
  db,
  documentMemberTemplate,
  eq,
  insertDocumentMemberTemplateSchema
} from '@repo/database';
import { z } from 'zod';

const getByDocumentTemplateId = o
  .use(projectMiddleware)
  .input(z.object({ documentTemplateId: z.string() }))
  .handler(async ({ input }) => {
    const documentMemberTemplates = await db.query.documentMemberTemplate.findMany({
      where: eq(documentMemberTemplate.documentTemplateId, input.documentTemplateId)
    });

    return documentMemberTemplates;
  });

const upsert = o
  .use(projectMiddleware)
  .input(
    z.object({
      documentTemplateId: z.string(),
      documentMemberTemplates: z.array(insertDocumentMemberTemplateSchema.omit({ id: true }))
    })
  )
  .handler(async ({ input, context }) => {
    try {
      const currentDocumentMemberTemplates = await db.query.documentMemberTemplate.findMany({
        where(fields, operators) {
          return operators.eq(fields.documentTemplateId, input.documentTemplateId);
        }
      });

      let results: DocumentMemberTemplate[] = [];

      const documentMemberTemplatesToCreate = input.documentMemberTemplates.filter(
        (documentMemberTemplate) =>
          !currentDocumentMemberTemplates.some(
            (s) => s.documentTemplateId === documentMemberTemplate.documentTemplateId
          )
      );
      const documentMemberTemplatesToUpdate = input.documentMemberTemplates.filter((documentMemberTemplate) =>
        currentDocumentMemberTemplates.some((s) => s.documentTemplateId === documentMemberTemplate.documentTemplateId)
      );

      if (documentMemberTemplatesToCreate.length > 0) {
        const createdDocumentMemberTemplates = await db
          .insert(documentMemberTemplate)
          .values(documentMemberTemplatesToCreate.map((s) => ({ ...s, projectId: context.project.id })))
          .returning();

        results.push(...createdDocumentMemberTemplates);
      }

      const updatableDocumentMemberTemplates = documentMemberTemplatesToUpdate.filter(
        (s): s is typeof s & { documentTemplateId: string } => !!s.documentTemplateId
      );

      if (updatableDocumentMemberTemplates.length > 0) {
        const updatedDocumentMemberTemplatesNested = await Promise.all(
          updatableDocumentMemberTemplates.map((s) =>
            db
              .update(documentMemberTemplate)
              .set({
                ...s,
                updatedAt: new Date().toISOString()
              })
              .where(
                and(
                  eq(documentMemberTemplate.documentTemplateId, input.documentTemplateId),
                  eq(documentMemberTemplate.memberTemplateId, s.memberTemplateId)
                )
              )
              .returning()
          )
        );
        const updatedDocumentMemberTemplates = updatedDocumentMemberTemplatesNested.flat();

        results.push(...updatedDocumentMemberTemplates);
      }

      return results;
    } catch (error) {
      console.error(error);
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to upsert documentMemberTemplates' });
    }
  });

export const documentMemberTemplateRouter = {
  upsert,
  getByDocumentTemplateId
};
