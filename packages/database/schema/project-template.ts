import { timestamps } from '../utils/timestamps';
import { user } from './auth';
import { projectStatusEnum } from './enums';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const projectTemplate = pgTable('project_template', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  organizationId: t.text(),
  domainKey: t.text().notNull(),
  name: t.text().notNull(),
  slug: t.text().notNull(),
  version: t.text().notNull().default('1.0.0'),
  description: t.text().default(''),
  isDefault: t.boolean().notNull().default(false),
  createdBy: t.text().references(() => user.id, { onDelete: 'set null' }),
  defaultProjectStatus: projectStatusEnum().default('ACTIVE'),
  ...timestamps
}));

export const selectProjectTemplateSchema = createSelectSchema(projectTemplate);
export const insertProjectTemplateSchema = createInsertSchema(projectTemplate);
export const updateProjectTemplateSchema = createInsertSchema(projectTemplate)
  .partial()
  .extend({ id: z.string().uuid() });

export type ProjectTemplate = typeof projectTemplate.$inferSelect;
export type ProjectTemplateInsert = typeof projectTemplate.$inferInsert;
