import { timestamps } from '../utils/timestamps';
import { categoryTemplate } from './category-template';
import { project } from './project';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const category = pgTable('category', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectId: t
    .uuid()
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  categoryTemplateId: t
    .uuid()
    .notNull()
    .references(() => categoryTemplate.id, { onDelete: 'cascade' }),
  name: t.text().notNull(),
  description: t.text().default(''),
  hexColor: t.text().notNull().default('#7cce00'),
  ...timestamps
}));

export const selectCategorySchema = createSelectSchema(category);
export const insertCategorySchema = createInsertSchema(category);
export const updateCategorySchema = createInsertSchema(category).partial().extend({ id: z.string().uuid() });

export type Category = typeof category.$inferSelect;
export type CategoryInsert = typeof category.$inferInsert;
