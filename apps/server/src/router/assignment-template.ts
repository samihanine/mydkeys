import { o } from '../lib/orpc';
import { adminMiddleware } from '../middlewares/admin-middleware';
import { ORPCError } from '@orpc/server';
import {
  assignmentTemplate,
  db,
  eq,
  insertAssignmentTemplateSchema,
  updateAssignmentTemplateSchema
} from '@repo/database';
import { z } from 'zod';

const getAll = o.handler(async ({ context }) => {
  const assignmentTemplates = await db.query.assignmentTemplate.findMany({
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return assignmentTemplates;
});

const create = o
  .use(adminMiddleware)
  .input(insertAssignmentTemplateSchema)
  .handler(async ({ input, context }) => {
    const [inserted] = await db.insert(assignmentTemplate).values(input).returning();

    if (!inserted) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Error while creating assignmentTemplate' });
    }

    return inserted;
  });

const getById = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const assignmentTemplate = await db.query.assignmentTemplate.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!assignmentTemplate) {
      throw new ORPCError('NOT_FOUND', { message: 'AssignmentTemplate not found' });
    }

    return assignmentTemplate;
  });

const update = o
  .use(adminMiddleware)
  .input(updateAssignmentTemplateSchema)
  .handler(async ({ input }) => {
    const [updated] = await db
      .update(assignmentTemplate)
      .set(input)
      .where(eq(assignmentTemplate.id, input.id))
      .returning();

    if (!updated) {
      throw new ORPCError('NOT_FOUND', { message: 'AssignmentTemplate not found' });
    }

    return updated;
  });

const destroy = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    await db.delete(assignmentTemplate).where(eq(assignmentTemplate.id, input.id));

    return null;
  });

const getByDomainId = o
  .use(adminMiddleware)
  .input(z.object({ domainId: z.string() }))
  .handler(async ({ input }) => {
    const assignmentTemplates = await db.query.assignmentTemplate.findMany({
      where: eq(assignmentTemplate.domainId, input.domainId)
    });

    return assignmentTemplates;
  });

const getByDocumentTemplateId = o
  .use(adminMiddleware)
  .input(z.object({ documentTemplateId: z.string() }))
  .handler(async ({ input }) => {
    const assignmentTemplates = await db.query.assignmentTemplate.findMany({
      where: eq(assignmentTemplate.documentTemplateId, input.documentTemplateId)
    });

    return assignmentTemplates;
  });

const getByGroupTemplateId = o
  .use(adminMiddleware)
  .input(z.object({ groupTemplateId: z.string() }))
  .handler(async ({ input }) => {
    const assignmentTemplates = await db.query.assignmentTemplate.findMany({
      where: eq(assignmentTemplate.groupTemplateId, input.groupTemplateId)
    });

    return assignmentTemplates;
  });

export const assignmentTemplateRouter = {
  getAll,
  create,
  getById,
  update,
  destroy,
  getByDomainId,
  getByDocumentTemplateId,
  getByGroupTemplateId
};
