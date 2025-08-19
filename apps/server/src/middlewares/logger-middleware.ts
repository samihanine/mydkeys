import env from '../env';
import { pinoLogger as logger } from 'hono-pino';
import pino from 'pino';

export function loggerMiddleware() {
  const customTransport = {
    target: 'pino-pretty',
    options: {
      messageFormat: '{req.url} - {res.status}',
      ignore: 'pid,hostname,req.method,req.remoteAddress,req.remotePort,req.headers,res.headers,req.id,responseTime',
      messageKey: 'msg',
      minimumLevel: 'info',
      hideObject: true,
      colorize: false,
      singleLine: false,
      append: '\n'
    }
  };

  return logger({
    pino: pino({
      level: env.LOG_LEVEL || 'info',
      transport: customTransport
    }),
    http: {
      reqId: () => crypto.randomUUID()
    }
  });
}
