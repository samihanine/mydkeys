import { o } from '../lib/orpc';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { and, db, eq, groupMember } from '@repo/database';
import { z } from 'zod';

const upsert = o
  .use(projectMiddleware)
  .input(z.object({ memberId: z.string(), groupIds: z.array(z.string()) }))
  .handler(async ({ input, context }) => {
    const existingGroupMembers = await db.query.groupMember.findMany({
      where(fields, operators) {
        return operators.and(
          operators.eq(fields.projectId, context.project.id),
          operators.eq(fields.memberId, input.memberId)
        );
      }
    });

    const groupMembersToCreate = input.groupIds.filter(
      (groupId) => !existingGroupMembers.some((groupMember) => groupMember.groupId === groupId)
    );
    const groupMembersToDelete = existingGroupMembers.filter(
      (groupMember) => !input.groupIds.includes(groupMember.groupId)
    );

    for (const groupMemberToCreate of groupMembersToCreate) {
      await db.insert(groupMember).values({
        projectId: context.project.id,
        memberId: input.memberId,
        groupId: groupMemberToCreate
      });
    }

    for (const groupMemberToDelete of groupMembersToDelete) {
      await db
        .delete(groupMember)
        .where(and(eq(groupMember.id, groupMemberToDelete.id), eq(groupMember.projectId, context.project.id)));
    }

    return { success: true };
  });

const getByCurrentMember = o.use(projectMiddleware).handler(async ({ context }) => {
  const groupMembers = await db.query.groupMember.findMany({
    where(fields, operators) {
      return operators.eq(fields.projectId, context.project.id);
    }
  });

  return groupMembers;
});

const getById = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    const groupMember = await db.query.groupMember.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!groupMember) {
      throw new ORPCError('NOT_FOUND', { message: 'Group member not found' });
    }

    return groupMember;
  });

const getByCurrentProject = o.use(projectMiddleware).handler(async ({ context }) => {
  const groupMembers = await db.query.groupMember.findMany({
    where(fields, operators) {
      return operators.eq(fields.projectId, context.project.id);
    }
  });

  return groupMembers;
});

const getByGroupId = o
  .use(projectMiddleware)
  .input(z.object({ groupId: z.string() }))
  .handler(async ({ input, context }) => {
    const groupMembers = await db.query.groupMember.findMany({
      where(fields, operators) {
        return operators.eq(fields.groupId, input.groupId);
      }
    });

    return groupMembers;
  });

const getByMemberId = o
  .use(projectMiddleware)
  .input(z.object({ memberId: z.string() }))
  .handler(async ({ input, context }) => {
    const groupMembers = await db.query.groupMember.findMany({
      where(fields, operators) {
        return operators.eq(fields.memberId, input.memberId);
      }
    });

    return groupMembers;
  });

export const groupMemberRouter = {
  upsert,
  getByCurrentMember,
  getById,
  getByCurrentProject,
  getByGroupId,
  getByMemberId
};
