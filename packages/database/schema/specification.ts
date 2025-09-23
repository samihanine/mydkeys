import { timestamps } from '../utils/timestamps';
import { project } from './project';
import { specificationTemplate } from './specification-template';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const specification = pgTable('specification', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectId: t
    .uuid()
    .notNull()
    .references(() => project.id, { onDelete: 'restrict' }),
  value: t.text().notNull(),
  specificationTemplateId: t.uuid().references(() => specificationTemplate.id, { onDelete: 'restrict' }),
  ...timestamps
}));

export const selectSpecificationSchema = createSelectSchema(specification);
export const insertSpecificationSchema = createInsertSchema(specification);
export const updateSpecificationSchema = createInsertSchema(specification).partial().extend({ id: z.string().uuid() });

export type Specification = typeof specification.$inferSelect;
export type SpecificationInsert = typeof specification.$inferInsert;
