import { timestamps } from '../utils/timestamps';
import { domain } from './domain';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const folderTemplate = pgTable('folder_template', (t) => ({
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

export const selectFolderTemplateSchema = createSelectSchema(folderTemplate);
export const insertFolderTemplateSchema = createInsertSchema(folderTemplate);
export const updateFolderTemplateSchema = createInsertSchema(folderTemplate)
  .partial()
  .extend({ id: z.string().uuid() });

export type FolderTemplate = typeof folderTemplate.$inferSelect;
export type FolderTemplateInsert = typeof folderTemplate.$inferInsert;
