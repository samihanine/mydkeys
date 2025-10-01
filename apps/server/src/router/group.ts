import { o } from '../lib/orpc';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { and, db, eq } from '@repo/database';
import { group, insertGroupSchema, updateGroupSchema } from '@repo/database';
import { z } from 'zod';

const create = o
  .use(projectMiddleware)
  .input(insertGroupSchema.omit({ id: true, projectId: true }))
  .handler(async ({ input, context }) => {
    const [newGroup] = await db
      .insert(group)
      .values({
        ...input,
        projectId: context.project.id
      })
      .returning();

    if (!newGroup) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to create group' });
    }

    return newGroup;
  });

const update = o
  .use(projectMiddleware)
  .input(updateGroupSchema)
  .handler(async ({ input, context }) => {
    const [updatedGroup] = await db
      .update(group)
      .set({
        ...input,
        updatedAt: new Date().toISOString()
      })
      .where(and(eq(group.id, input.id), eq(group.projectId, context.project.id)))
      .returning();

    if (!updatedGroup) {
      throw new ORPCError('NOT_FOUND', { message: 'Group not found' });
    }

    return updatedGroup;
  });

const destroy = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    await db.delete(group).where(and(eq(group.id, input.id), eq(group.projectId, context.project.id)));

    return { success: true };
  });

const getById = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    const foundGroup = await db.query.group.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!foundGroup) {
      throw new ORPCError('NOT_FOUND', { message: 'Group not found' });
    }

    return foundGroup;
  });

const getByCurrentProject = o.use(projectMiddleware).handler(async ({ context }) => {
  const groups = await db.query.group.findMany({
    where(fields, operators) {
      return operators.eq(fields.projectId, context.project.id);
    },
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return groups;
});

const getByCurrentMember = o.use(projectMiddleware).handler(async ({ context }) => {
  const groupMembers = await db.query.groupMember.findMany({
    where(fields, operators) {
      return and(operators.eq(fields.projectId, context.project.id), operators.eq(fields.memberId, context.member.id));
    }
  });

  const groupGroups = await db.query.assignment.findMany({
    where(fields, operators) {
      return operators.inArray(
        fields.groupId,
        groupMembers.map((g) => g.groupId)
      );
    }
  });

  return await db.query.group.findMany({
    where(fields, operators) {
      return operators.inArray(
        fields.id,
        groupGroups.map((g) => g.groupId)
      );
    }
  });
});

export const groupRouter = {
  create,
  update,
  destroy,
  getById,
  getByCurrentProject,
  getByCurrentMember
};
