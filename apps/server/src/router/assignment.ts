import { o } from '../lib/orpc';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { and, db, eq } from '@repo/database';
import { assignment, insertAssignmentSchema, updateAssignmentSchema } from '@repo/database';
import { z } from 'zod';

const create = o
  .use(projectMiddleware)
  .input(insertAssignmentSchema.omit({ id: true, projectId: true }))
  .handler(async ({ input, context }) => {
    const [newAssignment] = await db
      .insert(assignment)
      .values({
        ...input,
        projectId: context.project.id
      })
      .returning();

    if (!newAssignment) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to create assignment' });
    }

    return newAssignment;
  });

const update = o
  .use(projectMiddleware)
  .input(updateAssignmentSchema)
  .handler(async ({ input, context }) => {
    const [updatedAssignment] = await db
      .update(assignment)
      .set({
        ...input,
        updatedAt: new Date().toISOString()
      })
      .where(and(eq(assignment.id, input.id), eq(assignment.projectId, context.project.id)))
      .returning();

    if (!updatedAssignment) {
      throw new ORPCError('NOT_FOUND', { message: 'Assignment not found' });
    }

    return updatedAssignment;
  });

const destroy = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    await db.delete(assignment).where(and(eq(assignment.id, input.id), eq(assignment.projectId, context.project.id)));

    return { success: true };
  });

const getById = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    const foundAssignment = await db.query.assignment.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!foundAssignment) {
      throw new ORPCError('NOT_FOUND', { message: 'Assignment not found' });
    }

    return foundAssignment;
  });

const getByCurrentProject = o.use(projectMiddleware).handler(async ({ context }) => {
  const assignments = await db.query.assignment.findMany({
    where(fields, operators) {
      return operators.eq(fields.projectId, context.project.id);
    },
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return assignments;
});

const getByDocumentId = o
  .use(projectMiddleware)
  .input(z.object({ documentId: z.string() }))
  .handler(async ({ input, context }) => {
    const assignments = await db.query.assignment.findMany({
      where(fields, operators) {
        return operators.eq(fields.documentId, input.documentId);
      }
    });

    return assignments;
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

    return assignments;
  });

export const assignmentRouter = {
  create,
  update,
  destroy,
  getById,
  getByCurrentProject,
  getByDocumentId,
  getByGroupId
};
