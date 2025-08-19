import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import * as path from 'node:path';
import { z } from 'zod';

const rootPath = path.resolve(__dirname, '..', '..', '..');
expand(
  config({
    path: path.resolve(rootPath, process.env.NODE_ENV === 'test' ? '.env.test' : '.env')
  })
);

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  SERVER_PORT: z.coerce.number().default(5000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']),
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
  DO_ENDPOINT: z.string().url(),
  DO_SPACES_SECRET: z.string(),
  DO_SPACES_KEY: z.string(),
  DO_BUCKET: z.string(),
  DO_CDN_ENDPOINT: z.string().url(),
  NEXT_PUBLIC_FILE_ENDPOINT: z.string().url()
});

export type env = z.infer<typeof EnvSchema>;

const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error('❌ Invalid env:');
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

export default env!;
