import { timestamps } from '../utils/timestamps';
import { categoryTemplate } from './category-template';
import { documentTemplate } from './document-template';
import { domain } from './domain';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const categoryTemplateDocumentTemplate = pgTable('category_template_document_template', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  domainId: t
    .uuid()
    .notNull()
    .references(() => domain.id, { onDelete: 'cascade' }),
  categoryTemplateId: t
    .uuid()
    .notNull()
    .references(() => categoryTemplate.id, { onDelete: 'cascade' }),
  documentTemplateId: t
    .uuid()
    .notNull()
    .references(() => documentTemplate.id, { onDelete: 'cascade' }),
  ...timestamps
}));

export const selectCategoryTemplateDocumentTemplateSchema = createSelectSchema(categoryTemplateDocumentTemplate);
export const insertCategoryTemplateDocumentTemplateSchema = createInsertSchema(categoryTemplateDocumentTemplate);
export const updateCategoryTemplateDocumentTemplateSchema = createInsertSchema(categoryTemplateDocumentTemplate)
  .partial()
  .extend({ id: z.string().uuid() });

export type CategoryTemplateDocumentTemplate = typeof categoryTemplateDocumentTemplate.$inferSelect;
export type CategoryTemplateDocumentTemplateInsert = typeof categoryTemplateDocumentTemplate.$inferInsert;
