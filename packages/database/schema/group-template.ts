import { timestamps } from '../utils/timestamps';
import { domain } from './domain';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const groupTemplate = pgTable('group_template', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  domainId: t
    .uuid()
    .notNull()
    .references(() => domain.id, { onDelete: 'cascade' }),
  name: t.text().notNull(),
  description: t.text().default(''),
  isAdministrator: t.boolean().notNull().default(false),
  ...timestamps
}));

export const selectGroupTemplateSchema = createSelectSchema(groupTemplate);
export const insertGroupTemplateSchema = createInsertSchema(groupTemplate);
export const updateGroupTemplateSchema = createInsertSchema(groupTemplate).partial().extend({ id: z.string().uuid() });

export type GroupTemplate = typeof groupTemplate.$inferSelect;
export type GroupTemplateInsert = typeof groupTemplate.$inferInsert;
