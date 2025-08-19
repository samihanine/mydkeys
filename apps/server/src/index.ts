import app from './app';
import env from './env';
import { serve } from '@hono/node-server';

const port = Number(process.env.PORT || process.env.SERVER_PORT || 4000);
// eslint-disable-next-line no-console
console.log(`Server is running on port http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
  hostname: '0.0.0.0'
});
