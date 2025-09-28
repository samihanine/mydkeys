import env from '../env';
import { o } from '../lib/orpc';
import { uploadFileToS3 } from '../lib/s3';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { db } from '@repo/database/db';
import { file } from '@repo/database/schema/file';
import { z } from 'zod';

export const upload = o
  .use(projectMiddleware)
  .input(z.object({ file: z.instanceof(File) }))
  .handler(async ({ input, context }) => {
    const key = await uploadFileToS3(input.file as any);

    const result = await db
      .insert(file)
      .values({
        bucket: env.DO_BUCKET as string,
        key,
        filename: input.file.name,
        mime: input.file.type,
        size: input.file.size,
        name: input.file.name,
        description: input.file.name,
        altText: input.file.name,
        uploadedByUserId: context.member.userId,
        projectId: context.project.id
      })
      .returning();

    if (!result[0]) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to upload file' });
    }

    return result[0];
  });

const getById = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    const result = await db.query.file.findFirst({
      where: (fields, { eq }) => eq(fields.id, input.id)
    });

    return result;
  });

const getAll = o.use(projectMiddleware).handler(async ({ context }) => {
  const result = await db.query.file.findMany({
    where: (fields, { eq }) => eq(fields.projectId, context.project.id)
  });

  return result;
});

export const fileRouter = {
  upload,
  getById,
  getAll
};
