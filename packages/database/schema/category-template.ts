import { timestamps } from '../utils/timestamps';
import { domain } from './domain';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const categoryTemplate = pgTable('category_template', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  domainId: t
    .uuid()
    .notNull()
    .references(() => domain.id, { onDelete: 'cascade' }),
  name: t.text().notNull(),
  description: t.text().default(''),
  hexColor: t.text().notNull().default('#7cce00'),
  ...timestamps
}));

export const selectCategoryTemplateSchema = createSelectSchema(categoryTemplate);
export const insertCategoryTemplateSchema = createInsertSchema(categoryTemplate);
export const updateCategoryTemplateSchema = createInsertSchema(categoryTemplate)
  .partial()
  .extend({ id: z.string().uuid() });

export type CategoryTemplate = typeof categoryTemplate.$inferSelect;
export type CategoryTemplateInsert = typeof categoryTemplate.$inferInsert;
