import { timestamps } from '../utils/timestamps';
import { permissionEnum } from './enums';
import { project } from './project';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const assignment = pgTable('assignment', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectId: t
    .uuid()
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  documentId: t.uuid(),
  groupId: t.uuid().notNull(),
  folderId: t.uuid(),
  permission: permissionEnum().notNull(),
  assignmentTemplateId: t.uuid().notNull(),
  ...timestamps
}));

export const selectAssignmentSchema = createSelectSchema(assignment);
export const insertAssignmentSchema = createInsertSchema(assignment);
export const updateAssignmentSchema = createInsertSchema(assignment).partial().extend({ id: z.string().uuid() });

export type Assignment = typeof assignment.$inferSelect;
export type AssignmentInsert = typeof assignment.$inferInsert;
