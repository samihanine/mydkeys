import { timestamps } from '../utils/timestamps';
import { projectTemplate } from './project-template';
import { stakeholderTemplate } from './stakeholder-template';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const documentTemplate = pgTable('document_template', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectTemplateId: t
    .uuid()
    .notNull()
    .references(() => projectTemplate.id, { onDelete: 'cascade' }),
  name: t.text().notNull(),
  slug: t.text().notNull(),
  category: t.text(),
  requiredForStakeholderTemplateId: t.uuid().references(() => stakeholderTemplate.id, { onDelete: 'set null' }),
  isRequired: t.boolean().notNull().default(true),
  mimeWhitelist: t.text().array(),
  exampleUrl: t.text(),
  ...timestamps
}));

export const selectDocumentTemplateSchema = createSelectSchema(documentTemplate);
export const insertDocumentTemplateSchema = createInsertSchema(documentTemplate);
export const updateDocumentTemplateSchema = createInsertSchema(documentTemplate)
  .partial()
  .extend({ id: z.string().uuid() });

export type DocumentTemplate = typeof documentTemplate.$inferSelect;
export type DocumentTemplateInsert = typeof documentTemplate.$inferInsert;
