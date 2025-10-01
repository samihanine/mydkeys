import { o } from '../lib/orpc';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { and, db, eq } from '@repo/database';
import { folder, insertFolderSchema, updateFolderSchema } from '@repo/database';
import { z } from 'zod';

const create = o
  .use(projectMiddleware)
  .input(insertFolderSchema.omit({ id: true, projectId: true }))
  .handler(async ({ input, context }) => {
    const [newFolder] = await db
      .insert(folder)
      .values({
        ...input,
        projectId: context.project.id
      })
      .returning();

    if (!newFolder) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to create folder' });
    }

    return newFolder;
  });

const update = o
  .use(projectMiddleware)
  .input(updateFolderSchema)
  .handler(async ({ input, context }) => {
    const [updatedFolder] = await db
      .update(folder)
      .set({
        ...input,
        updatedAt: new Date().toISOString()
      })
      .where(and(eq(folder.id, input.id), eq(folder.projectId, context.project.id)))
      .returning();

    if (!updatedFolder) {
      throw new ORPCError('NOT_FOUND', { message: 'Folder not found' });
    }

    return updatedFolder;
  });

const destroy = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    await db.delete(folder).where(and(eq(folder.id, input.id), eq(folder.projectId, context.project.id)));

    return { success: true };
  });

const getById = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    const foundFolder = await db.query.folder.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!foundFolder) {
      throw new ORPCError('NOT_FOUND', { message: 'Folder not found' });
    }

    return foundFolder;
  });

const getByCurrentProject = o.use(projectMiddleware).handler(async ({ context }) => {
  const folders = await db.query.folder.findMany({
    where(fields, operators) {
      return operators.eq(fields.projectId, context.project.id);
    },
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return folders;
});

export const folderRouter = {
  create,
  update,
  destroy,
  getById,
  getByCurrentProject
};
