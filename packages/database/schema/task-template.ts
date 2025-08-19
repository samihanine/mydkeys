import { timestamps } from '../utils/timestamps';
import { projectTemplate } from './project-template';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const taskTemplate = pgTable('task_template', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectTemplateId: t
    .uuid()
    .notNull()
    .references(() => projectTemplate.id, { onDelete: 'cascade' }),
  name: t.text().notNull(),
  slug: t.text().notNull(),
  description: t.text().default(''),
  position: t.integer().notNull().default(0),
  durationEstDays: t.integer(),
  dependsOn: t.uuid().array(),
  ...timestamps
}));

export const selectTaskTemplateSchema = createSelectSchema(taskTemplate);
export const insertTaskTemplateSchema = createInsertSchema(taskTemplate);
export const updateTaskTemplateSchema = createInsertSchema(taskTemplate).partial().extend({ id: z.string().uuid() });

export type TaskTemplate = typeof taskTemplate.$inferSelect;
export type TaskTemplateInsert = typeof taskTemplate.$inferInsert;
