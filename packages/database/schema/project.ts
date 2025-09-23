import { timestamps } from '../utils/timestamps';
import { user } from './auth';
import { domain } from './domain';
import { file } from './file';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const project = pgTable('project', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  domainId: t
    .uuid()
    .notNull()
    .references(() => domain.id, { onDelete: 'restrict' }),
  name: t.text().notNull(),
  createdBy: t.text().references(() => user.id, { onDelete: 'set null' }),
  imageFileId: t.uuid().references(() => file.id, { onDelete: 'set null' }),
  description: t.text().default(''),
  ...timestamps
}));

export const selectProjectSchema = createSelectSchema(project);
export const insertProjectSchema = createInsertSchema(project);
export const updateProjectSchema = createInsertSchema(project).partial().extend({ id: z.string().uuid() });

export type Project = typeof project.$inferSelect;
export type ProjectInsert = typeof project.$inferInsert;
