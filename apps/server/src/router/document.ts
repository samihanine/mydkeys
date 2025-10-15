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

const getByCurrentProject = o.use(projectMiddleware).handler(async ({ context }) => {
  if (context.member.isAdministrator) {
    return await db.query.document.findMany({
      where(fields, operators) {
        return operators.eq(fields.projectId, context.project.id);
      },
      orderBy: (fields, { desc }) => desc(fields.createdAt)
    });
  }

  const groupMembers = await db.query.groupMember.findMany({
    where(fields, operators) {
      return and(operators.eq(fields.projectId, context.project.id), operators.eq(fields.memberId, context.member.id));
    }
  });

  const documentGroups = await db.query.assignment.findMany({
    where(fields, operators) {
      return operators.inArray(
        fields.groupId,
        groupMembers.map((g) => g.groupId)
      );
    }
  });

  return await db.query.document.findMany({
    where(fields, operators) {
      if (context.member.isAdministrator) {
        return operators.eq(fields.projectId, context.project.id);
      }

      return operators.inArray(
        fields.id,
        documentGroups.map((g) => g.documentId).filter((id): id is string => id !== null)
      );
    }
  });
});

const getByGroupId = o
  .use(projectMiddleware)
  .input(z.object({ groupId: z.string() }))
  .handler(async ({ input, context }) => {
    const assignments = await db.query.assignment.findMany({
      where(fields, operators) {
        return operators.eq(fields.groupId, input.groupId);
      }
    });

    const documentIds = assignments.map((a) => a.documentId).filter((id): id is string => id !== null);

    if (documentIds.length === 0) {
      return [];
    }

    const documents = await db.query.document.findMany({
      where(fields, operators) {
        return operators.inArray(fields.id, documentIds);
      }
    });

    return documents;
  });

export const documentRouter = {
  create,
  update,
  destroy,
  getById,
  getByCurrentProject,
  getByGroupId
};
