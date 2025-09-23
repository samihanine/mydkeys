import { timestamps } from '../utils/timestamps';
import { domain } from './domain';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const category = pgTable('category', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  domainId: t
    .uuid()
    .notNull()
    .references(() => domain.id, { onDelete: 'cascade' }),
  name: t.text().notNull(),
  slug: t.text().notNull(),
  hexColor: t.text().notNull().default('#7cce00'),
  ...timestamps
}));

export const selectCategorySchema = createSelectSchema(category);
export const insertCategorySchema = createInsertSchema(category);
export const updateCategorySchema = createInsertSchema(category).partial().extend({ id: z.string().uuid() });

export type Category = typeof category.$inferSelect;
export type CategoryInsert = typeof category.$inferInsert;
