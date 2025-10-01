import { o } from '../lib/orpc';
import { adminMiddleware } from '../middlewares/admin-middleware';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { db, eq, groupTemplate, insertGroupTemplateSchema, project, updateGroupTemplateSchema } from '@repo/database';
import { z } from 'zod';

const getAll = o.handler(async () => {
  const groupTemplates = await db.query.groupTemplate.findMany({
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return groupTemplates;
});

const create = o
  .use(adminMiddleware)
  .input(insertGroupTemplateSchema)
  .handler(async ({ input }) => {
    const [inserted] = await db.insert(groupTemplate).values(input).returning();

    if (!inserted) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Error while creating groupTemplate' });
    }

    return inserted;
  });

const getById = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const found = await db.query.groupTemplate.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!found) {
      throw new ORPCError('NOT_FOUND', { message: 'GroupTemplate not found' });
    }

    return found;
  });

const update = o
  .use(adminMiddleware)
  .input(updateGroupTemplateSchema)
  .handler(async ({ input }) => {
    const [updated] = await db.update(groupTemplate).set(input).where(eq(groupTemplate.id, input.id)).returning();

    if (!updated) {
      throw new ORPCError('NOT_FOUND', { message: 'GroupTemplate not found' });
    }

    return updated;
  });

const destroy = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    await db.delete(groupTemplate).where(eq(groupTemplate.id, input.id));

    return null;
  });

const getByDomainId = o
  .use(projectMiddleware)
  .input(z.object({ domainId: z.string() }))
  .handler(async ({ input }) => {
    const results = await db.query.groupTemplate.findMany({
      where: eq(groupTemplate.domainId, input.domainId)
    });

    return results;
  });

export const groupTemplateRouter = {
  getAll,
  create,
  getById,
  update,
  destroy,
  getByDomainId
};
