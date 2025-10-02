import { timestamps } from '../utils/timestamps';
import { category } from './category';
import { categoryTemplateDocumentTemplate } from './category-template-document-template';
import { document } from './document';
import { project } from './project';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const categoryDocument = pgTable('category_document', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectId: t
    .uuid()
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  categoryId: t
    .uuid()
    .notNull()
    .references(() => category.id, { onDelete: 'cascade' }),
  documentId: t
    .uuid()
    .notNull()
    .references(() => document.id, { onDelete: 'cascade' }),
  categoryTemplateDocumentTemplateId: t
    .uuid()
    .references(() => categoryTemplateDocumentTemplate.id, { onDelete: 'cascade' }),
  ...timestamps
}));

export const selectCategoryDocumentSchema = createSelectSchema(categoryDocument);
export const insertCategoryDocumentSchema = createInsertSchema(categoryDocument);
export const updateCategoryDocumentSchema = createInsertSchema(categoryDocument)
  .partial()
  .extend({ id: z.string().uuid() });

export type CategoryDocument = typeof categoryDocument.$inferSelect;
export type CategoryDocumentInsert = typeof categoryDocument.$inferInsert;
