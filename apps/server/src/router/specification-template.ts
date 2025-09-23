import { o } from '../lib/orpc';
import { adminMiddleware } from '../middlewares/admin-middleware';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import {
  db,
  eq,
  insertSpecificationTemplateSchema,
  specificationTemplate,
  updateSpecificationTemplateSchema
} from '@repo/database';
import { z } from 'zod';

const getAll = o.handler(async () => {
  const specificationTemplates = await db.query.specificationTemplate.findMany({
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return specificationTemplates;
});

const create = o
  .use(adminMiddleware)
  .input(insertSpecificationTemplateSchema)
  .handler(async ({ input }) => {
    const [inserted] = await db.insert(specificationTemplate).values(input).returning();

    if (!inserted) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Error while creating specificationTemplate' });
    }

    return inserted;
  });

const getById = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const found = await db.query.specificationTemplate.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!found) {
      throw new ORPCError('NOT_FOUND', { message: 'SpecificationTemplate not found' });
    }

    return found;
  });

const update = o
  .use(adminMiddleware)
  .input(updateSpecificationTemplateSchema)
  .handler(async ({ input }) => {
    const [updated] = await db
      .update(specificationTemplate)
      .set(input)
      .where(eq(specificationTemplate.id, input.id))
      .returning();

    if (!updated) {
      throw new ORPCError('NOT_FOUND', { message: 'SpecificationTemplate not found' });
    }

    return updated;
  });

const destroy = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    await db.delete(specificationTemplate).where(eq(specificationTemplate.id, input.id));

    return null;
  });

const getByDomainId = o
  .use(projectMiddleware)
  .input(z.object({ domainId: z.string() }))
  .handler(async ({ input }) => {
    const results = await db.query.specificationTemplate.findMany({
      where: eq(specificationTemplate.domainId, input.domainId)
    });

    return results;
  });

export const specificationTemplateRouter = {
  getAll,
  create,
  getById,
  update,
  destroy,
  getByDomainId
};
