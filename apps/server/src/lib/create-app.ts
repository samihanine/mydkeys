import { loggerMiddleware } from '../middlewares/logger-middleware';
import type { AppBindings, AppOpenAPI } from './types';
import { OpenAPIHono } from '@hono/zod-openapi';
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares';
import { defaultHook } from 'stoker/openapi';

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(serveEmojiFavicon('📝'));
  app.use(loggerMiddleware());
  app.notFound(notFound);
  app.onError(onError);
  return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route('/', router);
}
