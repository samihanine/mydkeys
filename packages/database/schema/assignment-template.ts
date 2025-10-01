import { timestamps } from '../utils/timestamps';
import { domain } from './domain';
import { permissionEnum } from './enums';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const assignmentTemplate = pgTable('assignment_template', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  domainId: t
    .uuid()
    .notNull()
    .references(() => domain.id, { onDelete: 'cascade' }),
  documentTemplateId: t.uuid().notNull(),
  groupTemplateId: t.uuid().notNull(),
  permission: permissionEnum().notNull(),
  ...timestamps
}));

export const selectAssignmentTemplateSchema = createSelectSchema(assignmentTemplate);
export const insertAssignmentTemplateSchema = createInsertSchema(assignmentTemplate);
export const updateAssignmentTemplateSchema = createInsertSchema(assignmentTemplate)
  .partial()
  .extend({ id: z.string().uuid() });

export type AssignmentTemplate = typeof assignmentTemplate.$inferSelect;
export type AssignmentTemplateInsert = typeof assignmentTemplate.$inferInsert;
