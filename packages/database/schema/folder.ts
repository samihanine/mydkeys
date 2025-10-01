import { timestamps } from '../utils/timestamps';
import { folderTemplate } from './folder-template';
import { member } from './member';
import { project } from './project';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const folder = pgTable('folder', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectId: t
    .uuid()
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' })
    .notNull(),
  folderTemplateId: t.uuid().references(() => folderTemplate.id, { onDelete: 'set null' }),
  createdByMemberId: t.uuid().references(() => member.id, { onDelete: 'set null' }),

  parentFolderId: t.uuid(),
  name: t.text().notNull(),
  description: t.text().default(''),

  ...timestamps
}));

export const selectFolderSchema = createSelectSchema(folder);
export const insertFolderSchema = createInsertSchema(folder);
export const updateFolderSchema = createInsertSchema(folder).partial().extend({ id: z.string().uuid() });

export type Folder = typeof folder.$inferSelect;
export type FolderInsert = typeof folder.$inferInsert;
