import { o } from '../lib/orpc';
import { adminMiddleware } from '../middlewares/admin-middleware';
import { ORPCError } from '@orpc/server';
import { db, eq, insertMemberTemplateSchema, memberTemplate, updateMemberTemplateSchema } from '@repo/database';
import { z } from 'zod';

const getAll = o.handler(async ({ context }) => {
  const memberTemplates = await db.query.memberTemplate.findMany({
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return memberTemplates;
});

const create = o
  .use(adminMiddleware)
  .input(insertMemberTemplateSchema)
  .handler(async ({ input, context }) => {
    const [inserted] = await db.insert(memberTemplate).values(input).returning();

    if (!inserted) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Error while creating memberTemplate' });
    }

    return inserted;
  });

const getById = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const memberTemplate = await db.query.memberTemplate.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!memberTemplate) {
      throw new ORPCError('NOT_FOUND', { message: 'MemberTemplate not found' });
    }

    return memberTemplate;
  });

const update = o
  .use(adminMiddleware)
  .input(updateMemberTemplateSchema)
  .handler(async ({ input }) => {
    const [updated] = await db.update(memberTemplate).set(input).where(eq(memberTemplate.id, input.id)).returning();

    if (!updated) {
      throw new ORPCError('NOT_FOUND', { message: 'MemberTemplate not found' });
    }

    return updated;
  });

const destroy = o
  .use(adminMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    await db.delete(memberTemplate).where(eq(memberTemplate.id, input.id));

    return null;
  });

export const memberTemplateRouter = {
  getAll,
  create,
  getById,
  update,
  destroy
};
