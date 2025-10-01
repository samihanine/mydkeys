import { o } from '../lib/orpc';
import { authMiddleware } from '../middlewares/auth-middleware';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { Folder, Group, assignment, db, eq, folder, group } from '@repo/database';
import { Document, document, insertProjectSchema, member, project, updateProjectSchema, user } from '@repo/database';
import { z } from 'zod';

const getByCurrentUser = o.use(authMiddleware).handler(async ({ context }) => {
  const memberList = await db.query.member.findMany({
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
          memberList.map((m) => m.projectId)
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
    try {
      const [inserted] = await db.insert(project).values(input).returning();

      if (!inserted) {
        throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Error while creating project' });
      }

      await db.insert(member).values({
        displayName: context.session.user.name,
        kind: 'PERSON',
        externalEmail: context.session.user.email,
        metaJson: {},
        projectId: inserted.id,
        userId: context.session.user.id,
        isAdministrator: true
      });

      const documentTemplates = await db.query.documentTemplate.findMany({
        where(fields, operators) {
          return operators.eq(fields.domainId, inserted.domainId);
        }
      });

      const assignmentTemplates = await db.query.assignmentTemplate.findMany({
        where(fields, operators) {
          return operators.eq(fields.domainId, inserted.domainId);
        }
      });

      let allDocuments: Document[] = [];

      for (const documentTemplate of documentTemplates) {
        const documentResult = await db
          .insert(document)
          .values({
            projectId: inserted.id,
            documentTemplateId: documentTemplate.id,
            name: documentTemplate.name,
            description: documentTemplate.description,
            isRequired: documentTemplate.isRequired,
            mimeWhitelist: documentTemplate.mimeWhitelist,
            exampleUrl: documentTemplate.exampleUrl,
            tags: documentTemplate.tags
          })
          .returning();

        if (!documentResult[0]) {
          throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Error while creating document' });
        }

        allDocuments.push(documentResult[0]);
      }

      const groupTemplates = await db.query.groupTemplate.findMany({
        where(fields, operators) {
          return operators.eq(fields.domainId, inserted.domainId);
        }
      });

      let allGroups: Group[] = [];

      for (const groupTemplate of groupTemplates) {
        const groupResult = await db
          .insert(group)
          .values({
            projectId: inserted.id,
            groupTemplateId: groupTemplate.id,
            name: groupTemplate.name,
            isAdministrator: groupTemplate.isAdministrator
          })
          .returning();

        if (!groupResult[0]) {
          throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Error while creating group' });
        }

        allGroups.push(groupResult[0]);
      }

      for (const assignmentTemplate of assignmentTemplates) {
        const documentForAssignment = allDocuments.find(
          (d) => d.documentTemplateId === assignmentTemplate.documentTemplateId
        );
        const groupForAssignment = allGroups.find((g) => g.groupTemplateId === assignmentTemplate.groupTemplateId);

        if (!documentForAssignment || !groupForAssignment) {
          continue;
        }

        await db.insert(assignment).values({
          projectId: inserted.id,
          assignmentTemplateId: assignmentTemplate.id,
          documentId: documentForAssignment.id,
          groupId: groupForAssignment.id,
          permission: assignmentTemplate.permission
        });
      }

      const folderTemplates = await db.query.folderTemplate.findMany({
        where(fields, operators) {
          return operators.eq(fields.domainId, inserted.domainId);
        }
      });

      for (const folderTemplate of folderTemplates) {
        await db.insert(folder).values({
          projectId: inserted.id,
          folderTemplateId: folderTemplate.id,
          name: folderTemplate.name,
          description: folderTemplate.description
        });
      }

      await db
        .update(user)
        .set({
          selectedProjectId: inserted.id
        })
        .where(eq(user.id, context.session.user.id));

      return inserted;
    } catch (error) {
      console.error(error);
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Error while creating project' });
    }
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
  getByCurrentUser,
  create,
  getCurrentProject,
  getById,
  update,
  destroy,
  select
};
