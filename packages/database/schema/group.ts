import { timestamps } from '../utils/timestamps';
import { groupTemplate } from './group-template';
import { project } from './project';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const group = pgTable('group', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectId: t
    .uuid()
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  groupTemplateId: t.uuid().references(() => groupTemplate.id, { onDelete: 'cascade' }),
  name: t.text().notNull(),
  description: t.text().default(''),
  isAdministrator: t.boolean().notNull().default(false),
  hexColor: t.text().notNull().default('#1C90CD'),
  ...timestamps
}));

export const selectGroupSchema = createSelectSchema(group);
export const insertGroupSchema = createInsertSchema(group);
export const updateGroupSchema = createInsertSchema(group).partial().extend({ id: z.string().uuid() });

export type Group = typeof group.$inferSelect;
export type GroupInsert = typeof group.$inferInsert;
