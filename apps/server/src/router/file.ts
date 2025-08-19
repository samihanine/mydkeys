import env from '../env';
import { o } from '../lib/orpc';
import { uploadFileToS3 } from '../lib/s3';
import { authMiddleware } from '../middlewares/auth-middleware';
import { z } from 'zod';

export const create = o
  .use(authMiddleware)
  .input(z.object({ file: z.instanceof(File) }))
  .handler(async ({ input }) => {
    const file = input.file;

    const key = await uploadFileToS3(file as any);

    const url = env.NEXT_PUBLIC_FILE_ENDPOINT + '/' + key;

    return { key, src: url };
  });

export const fileRouter = {
  create
};
