import { o } from '../lib/orpc';
import { authMiddleware } from '../middlewares/auth-middleware';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { db, eq } from '@repo/database';
import { insertProjectSchema, project, stakeholder, updateProjectSchema, user } from '@repo/database';
import { z } from 'zod';

const getAll = o.use(authMiddleware).handler(async ({ context }) => {
  const stakeholderList = await db.query.stakeholder.findMany({
    where(fields, operators) {
      return operators.eq(fields.userId, context.session.user.id);
    },
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  const projectsList = await db.query.project.findMany({
    where(fields, operators) {
      return operators.and(
        operators.inArray(
          fields.id,
          stakeholderList.map((m) => m.projectId)
        ),
        operators.isNull(fields.deletedAt)
      );
    },
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return projectsList;
});

const create = o
  .use(authMiddleware)
  .input(insertProjectSchema)
  .handler(async ({ input, context }) => {
    const [inserted] = await db.insert(project).values(input).returning();

    if (!inserted) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Error while creating project' });
    }

    await db.insert(stakeholder).values({
      displayName: context.session.user.name,
      kind: 'PERSON',
      externalEmail: context.session.user.email,
      metaJson: {},
      projectId: inserted.id,
      userId: context.session.user.id
    });

    await db
      .update(user)
      .set({
        selectedProjectId: inserted.id
      })
      .where(eq(user.id, context.session.user.id));

    return inserted;
  });

const getCurrentProject = o.use(authMiddleware).handler(async ({ context }) => {
  if (!context.session.user.selectedProjectId) {
    throw new ORPCError('BAD_REQUEST', { message: 'No project selected' });
  }

  const projectResult = await db.query.project.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.id, context.session.user.selectedProjectId || ''),
        operators.isNull(fields.deletedAt)
      );
    }
  });

  if (!projectResult) {
    throw new ORPCError('NOT_FOUND', { message: 'Project not found' });
  }
  return projectResult;
});

const getById = o
  .use(authMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    const projectResult = await db.query.project.findFirst({
      where(fields, operators) {
        return operators.and(operators.eq(fields.id, input.id), operators.isNull(fields.deletedAt));
      }
    });

    if (!projectResult) {
      throw new ORPCError('NOT_FOUND', { message: 'Project not found' });
    }

    return projectResult;
  });

const update = o
  .use(projectMiddleware)
  .input(updateProjectSchema.extend({ id: z.string() }))
  .handler(async ({ input, context }) => {
    const { id, ...updates } = input;

    if (Object.keys(updates).length === 0) {
      throw new ORPCError('BAD_REQUEST', { message: 'No updates provided' });
    }

    const [updatedProject] = await db.update(project).set(updates).where(eq(project.id, id)).returning();

    if (!updatedProject) {
      throw new ORPCError('NOT_FOUND', { message: 'Project not found' });
    }

    return updatedProject;
  });

const destroy = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    const result = await db
      .update(project)
      .set({ deletedAt: new Date().toISOString() })
      .where(eq(project.id, input.id));

    await db.update(user).set({ selectedProjectId: null }).where(eq(user.selectedProjectId, input.id));

    if (result.length === 0) {
      throw new ORPCError('NOT_FOUND', { message: 'Project not found' });
    }

    return { success: true };
  });

const select = o
  .use(authMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    const projectResult = await db.query.project.findFirst({
      where(fields, operators) {
        return operators.and(operators.eq(fields.id, input.id), operators.isNull(fields.deletedAt));
      }
    });

    if (!projectResult) {
      throw new ORPCError('NOT_FOUND', { message: 'Project not found' });
    }

    await db.update(user).set({ selectedProjectId: input.id }).where(eq(user.id, context.session.user.id));

    return projectResult;
  });

export const projectRouter = {
  getAll,
  create,
  getCurrentProject,
  getById,
  update,
  destroy,
  select
};
