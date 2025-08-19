import { timestamps } from '../utils/timestamps';
import { projectTemplate } from './project-template';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const formTemplate = pgTable('form_template', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectTemplateId: t
    .uuid()
    .notNull()
    .references(() => projectTemplate.id, { onDelete: 'cascade' }),
  name: t.text().notNull(),
  slug: t.text().notNull(),
  // JSON schema pour les fields, validations, UI
  schemaJson: t.jsonb().notNull(),
  // valeurs par défaut
  defaultValuesJson: t.jsonb(),
  ...timestamps
}));

export const selectFormTemplateSchema = createSelectSchema(formTemplate);
export const insertFormTemplateSchema = createInsertSchema(formTemplate);
export const updateFormTemplateSchema = createInsertSchema(formTemplate).partial().extend({ id: z.string().uuid() });

export type FormTemplate = typeof formTemplate.$inferSelect;
export type FormTemplateInsert = typeof formTemplate.$inferInsert;
