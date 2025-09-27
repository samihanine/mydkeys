import { o } from '../lib/orpc';
import { projectMiddleware } from '../middlewares/project-middleware';
import { ORPCError } from '@orpc/server';
import { Specification, and, db, eq } from '@repo/database';
import { insertSpecificationSchema, specification, updateSpecificationSchema } from '@repo/database';
import { z } from 'zod';

const create = o
  .use(projectMiddleware)
  .input(insertSpecificationSchema.omit({ id: true, projectId: true }))
  .handler(async ({ input, context }) => {
    const [newSpecification] = await db
      .insert(specification)
      .values({
        ...input,
        projectId: context.project.id
      })
      .returning();

    if (!newSpecification) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to create specification' });
    }

    return newSpecification;
  });

const upsert = o
  .use(projectMiddleware)
  .input(z.array(insertSpecificationSchema.omit({ id: true, projectId: true })))
  .handler(async ({ input, context }) => {
    try {
      const currentSpecifications = await db.query.specification.findMany({
        where(fields, operators) {
          return operators.eq(fields.projectId, context.project.id);
        }
      });

      let results: Specification[] = [];

      const specificationsToCreate = input.filter(
        (specification) =>
          !currentSpecifications.some((s) => s.specificationTemplateId === specification.specificationTemplateId)
      );
      const specificationsToUpdate = input.filter((specification) =>
        currentSpecifications.some((s) => s.specificationTemplateId === specification.specificationTemplateId)
      );

      if (specificationsToCreate.length > 0) {
        const createdSpecifications = await db
          .insert(specification)
          .values(specificationsToCreate.map((s) => ({ ...s, projectId: context.project.id })))
          .returning();

        results.push(...createdSpecifications);
      }

      const updatableSpecifications = specificationsToUpdate.filter(
        (s): s is typeof s & { specificationTemplateId: string } => !!s.specificationTemplateId
      );

      if (updatableSpecifications.length > 0) {
        const updatedSpecificationsNested = await Promise.all(
          updatableSpecifications.map((s) =>
            db
              .update(specification)
              .set({
                ...s,
                updatedAt: new Date().toISOString()
              })
              .where(
                and(
                  eq(specification.projectId, context.project.id),
                  eq(specification.specificationTemplateId, s.specificationTemplateId)
                )
              )
              .returning()
          )
        );
        const updatedSpecifications = updatedSpecificationsNested.flat();

        results.push(...updatedSpecifications);
      }

      return results;
    } catch (error) {
      console.error(error);
      throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to upsert specifications' });
    }
  });

const update = o
  .use(projectMiddleware)
  .input(updateSpecificationSchema)
  .handler(async ({ input, context }) => {
    const [updatedSpecification] = await db
      .update(specification)
      .set({
        ...input,
        updatedAt: new Date().toISOString()
      })
      .where(and(eq(specification.id, input.id), eq(specification.projectId, context.project.id)))
      .returning();

    if (!updatedSpecification) {
      throw new ORPCError('NOT_FOUND', { message: 'Specification not found' });
    }

    return updatedSpecification;
  });

const destroy = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    await db
      .delete(specification)
      .where(and(eq(specification.id, input.id), eq(specification.projectId, context.project.id)));

    return { success: true };
  });

const getById = o
  .use(projectMiddleware)
  .input(z.object({ id: z.string() }))
  .handler(async ({ input, context }) => {
    const foundSpecification = await db.query.specification.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, input.id);
      }
    });

    if (!foundSpecification) {
      throw new ORPCError('NOT_FOUND', { message: 'Specification not found' });
    }

    return foundSpecification;
  });

const getAll = o.use(projectMiddleware).handler(async ({ context }) => {
  const specifications = await db.query.specification.findMany({
    where(fields, operators) {
      return operators.eq(fields.projectId, context.project.id);
    },
    orderBy: (fields, { desc }) => desc(fields.createdAt)
  });

  return specifications;
});

export const specificationRouter = {
  create,
  update,
  destroy,
  getById,
  getAll,
  upsert
};
