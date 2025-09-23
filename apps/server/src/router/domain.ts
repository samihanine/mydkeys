import { o } from '../lib/orpc';
import { adminMiddleware } from '../middlewares/admin-middleware';
import { ORPCError } from '@orpc/server';
import { db, domain, eq, insertDomainSchema, updateDomainSchema } from '@repo/database';
import { z } from 'zod';

const getAll = o.handler(async ({ context }) => {
  const domains = await db.query.domain.findMany({
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return domains;
});

const create = o
  .use(adminMiddleware)
  .input(insertDomainSchema)
  .handler(async ({ input, context }) => {
    const [inserted] = await db.insert(domain).values(input).returning();

    if (!inserted) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Error while creating domain' });
    }

    return inserted;
  });

const getById = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const domain = await db.query.domain.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!domain) {
      throw new ORPCError('NOT_FOUND', { message: 'Domain not found' });
    }

    return domain;
  });

const update = o
  .use(adminMiddleware)
  .input(updateDomainSchema)
  .handler(async ({ input }) => {
    const [updated] = await db.update(domain).set(input).where(eq(domain.id, input.id)).returning();

    if (!updated) {
      throw new ORPCError('NOT_FOUND', { message: 'Domain not found' });
    }

    return updated;
  });

const destroy = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    await db.delete(domain).where(eq(domain.id, input.id));

    return null;
  });

export const domainRouter = {
  getAll,
  create,
  getById,
  update,
  destroy
};
