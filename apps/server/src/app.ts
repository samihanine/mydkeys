import { auth } from './lib/auth';
import { createContext } from './lib/context';
import createApp from './lib/create-app';
import { getFileFromS3 } from './lib/s3';
import { appRouter } from './router';
import { serveStatic } from '@hono/node-server/serve-static';
import { RPCHandler } from '@orpc/server/fetch';
import { db } from '@repo/database';
import { cors } from 'hono/cors';

const app = createApp();
const handler = new RPCHandler(appRouter);

app.use(
  '*',
  cors({
    origin: ['http://localhost:3000', 'https://mydkeys.com', 'https://api.mydkeys.com', 'https://app.mydkeys.com'],
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true
  })
);

app.use(
  '/static/*',
  serveStatic({
    root: './src/'
  })
);

app.on(['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], '/auth/*', async (c) => {
  return await auth.handler(c.req.raw);
});

app.get('/api/v1/files/view/:id', async (c) => {
  try {
    const id = c.req.param('id');

    if (!id) {
      return c.text('File key is required', 400);
    }

    const fileData = await db.query.file.findFirst({
      where: (fields, { eq }) => eq(fields.id, id)
    });

    if (!fileData) {
      return c.text('File not found', 404);
    }

    const file = await getFileFromS3(fileData.key as string);

    // Définir les en-têtes appropriés
    const headers = new Headers();
    headers.set('Content-Type', file.contentType);
    headers.set('Content-Length', file.contentLength.toString());
    headers.set('Cache-Control', 'public, max-age=31536000'); // 1 an

    // Pour les images et PDFs, permettre l'affichage inline
    if (file.contentType.startsWith('image/') || file.contentType === 'application/pdf') {
      headers.set('Content-Disposition', 'inline');
    } else {
      // Pour les autres types de fichiers, forcer le téléchargement
      headers.set('Content-Disposition', 'attachment');
    }

    return c.newResponse(file.buffer, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return c.text('File not found', 404);
  }
});

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '0.0.1',
    title: 'MyDkeys API'
  }
});

app.use('/api/v1/*', async (c, next) => {
  const context = await createContext({ context: c });
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: '/api/v1',
    context: context
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }
  await next();
});

export default app;
