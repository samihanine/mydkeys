import { timestamps } from '../utils/timestamps';
import { stakeholderKindEnum } from './enums';
import { projectTemplate } from './project-template';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const stakeholderTemplate = pgTable('stakeholder_template', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectTemplateId: t
    .uuid()
    .notNull()
    .references(() => projectTemplate.id, { onDelete: 'cascade' }),
  name: t.text().notNull(),
  slug: t.text().notNull(),
  kind: stakeholderKindEnum().notNull().default('PERSON'),
  isRequired: t.boolean().notNull().default(false),
  maxCount: t.integer(),
  permissionsDefault: t.text().array(),
  ...timestamps
}));

export const selectStakeholderTemplateSchema = createSelectSchema(stakeholderTemplate);
export const insertStakeholderTemplateSchema = createInsertSchema(stakeholderTemplate);
export const updateStakeholderTemplateSchema = createInsertSchema(stakeholderTemplate)
  .partial()
  .extend({ id: z.string().uuid() });

export type StakeholderTemplate = typeof stakeholderTemplate.$inferSelect;
export type StakeholderTemplateInsert = typeof stakeholderTemplate.$inferInsert;
