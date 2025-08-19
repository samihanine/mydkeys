import { timestamps } from '../utils/timestamps';
import { user } from './auth';
import { taskStatusEnum } from './enums';
import { project } from './project';
import { stakeholder } from './stakeholder';
import { taskTemplate } from './task-template';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const task = pgTable('task', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectId: t
    .uuid()
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  taskTemplateId: t.uuid().references(() => taskTemplate.id, { onDelete: 'set null' }),
  title: t.text().notNull(),
  status: taskStatusEnum().notNull().default('TODO'),
  assigneeStakeholderId: t.uuid().references(() => stakeholder.id, { onDelete: 'set null' }),
  assigneeUserId: t.text().references(() => user.id, { onDelete: 'set null' }),
  dueAt: t.timestamp({ mode: 'string' }),
  position: t.integer().notNull().default(0),
  ...timestamps
}));

export const selectTaskSchema = createSelectSchema(task);
export const insertTaskSchema = createInsertSchema(task);
export const updateTaskSchema = createInsertSchema(task).partial().extend({ id: z.string().uuid() });

export type Task = typeof task.$inferSelect;
export type TaskInsert = typeof task.$inferInsert;
