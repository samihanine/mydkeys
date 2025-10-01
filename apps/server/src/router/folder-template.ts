import { o } from '../lib/orpc';
import { adminMiddleware } from '../middlewares/admin-middleware';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { db, eq, folderTemplate, insertFolderTemplateSchema, updateFolderTemplateSchema } from '@repo/database';
import { z } from 'zod';

const getAll = o.handler(async () => {
  const folderTemplates = await db.query.folderTemplate.findMany({
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return folderTemplates;
});

const create = o
  .use(adminMiddleware)
  .input(insertFolderTemplateSchema)
  .handler(async ({ input }) => {
    const [inserted] = await db.insert(folderTemplate).values(input).returning();

    if (!inserted) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Error while creating folderTemplate' });
    }

    return inserted;
  });

const getById = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const found = await db.query.folderTemplate.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!found) {
      throw new ORPCError('NOT_FOUND', { message: 'FolderTemplate not found' });
    }

    return found;
  });

const update = o
  .use(adminMiddleware)
  .input(updateFolderTemplateSchema)
  .handler(async ({ input }) => {
    const [updated] = await db.update(folderTemplate).set(input).where(eq(folderTemplate.id, input.id)).returning();

    if (!updated) {
      throw new ORPCError('NOT_FOUND', { message: 'FolderTemplate not found' });
    }

    return updated;
  });

const destroy = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    await db.delete(folderTemplate).where(eq(folderTemplate.id, input.id));

    return null;
  });

const getByDomainId = o
  .use(projectMiddleware)
  .input(z.object({ domainId: z.string() }))
  .handler(async ({ input }) => {
    const results = await db.query.folderTemplate.findMany({
      where: eq(folderTemplate.domainId, input.domainId)
    });

    return results;
  });

export const folderTemplateRouter = {
  getAll,
  create,
  getById,
  update,
  destroy,
  getByDomainId
};
