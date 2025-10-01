import { timestamps } from '../utils/timestamps';
import { category } from './category';
import { specificationTemplate } from './specification-template';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const condition = pgTable('condition', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  categoryId: t
    .uuid()
    .notNull()
    .references(() => category.id, { onDelete: 'cascade' }),
  specificationTemplateId: t
    .uuid()
    .notNull()
    .references(() => specificationTemplate.id, { onDelete: 'cascade' }),
  value: t.text().notNull(),
  ...timestamps
}));

export const selectConditionSchema = createSelectSchema(condition);
export const insertConditionSchema = createInsertSchema(condition);
export const updateConditionSchema = createInsertSchema(condition).partial().extend({ id: z.string().uuid() });

export type Condition = typeof condition.$inferSelect;
export type ConditionInsert = typeof condition.$inferInsert;
