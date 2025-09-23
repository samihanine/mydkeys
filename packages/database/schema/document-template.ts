import { timestamps } from '../utils/timestamps';
import { category } from './category';
import { domain } from './domain';
import { memberTemplate } from './member-template';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const documentTemplate = pgTable('document_template', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  domainId: t
    .uuid()
    .notNull()
    .references(() => domain.id, { onDelete: 'cascade' }),
  name: t.text().notNull(),
  slug: t.text().notNull(),
  categoryId: t.uuid().references(() => category.id, { onDelete: 'cascade' }),
  isRequired: t.boolean().notNull().default(true),
  mimeWhitelist: t.text().default(''),
  exampleUrl: t.text(),
  tags: t.text().default(''),
  ...timestamps
}));

export const selectDocumentTemplateSchema = createSelectSchema(documentTemplate);
export const insertDocumentTemplateSchema = createInsertSchema(documentTemplate);
export const updateDocumentTemplateSchema = createInsertSchema(documentTemplate)
  .partial()
  .extend({ id: z.string().uuid() });

export type DocumentTemplate = typeof documentTemplate.$inferSelect;
export type DocumentTemplateInsert = typeof documentTemplate.$inferInsert;
