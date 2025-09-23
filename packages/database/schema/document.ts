import { timestamps } from '../utils/timestamps';
import { user } from './auth';
import { documentTemplate } from './document-template';
import { documentStatusEnum } from './enums';
import { file } from './file';
import { member } from './member';
import { project } from './project';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const document = pgTable('document', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectId: t
    .uuid()
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  documentTemplateId: t.uuid().references(() => documentTemplate.id, { onDelete: 'restrict' }),
  memberId: t.uuid().references(() => member.id, { onDelete: 'set null' }),
  status: documentStatusEnum().notNull().default('MISSING'),
  fileId: t.uuid().references(() => file.id, { onDelete: 'set null' }),
  uploadedBy: t.text().references(() => user.id, { onDelete: 'set null' }),
  uploadedAt: t.timestamp({ mode: 'string' }),
  notes: t.text().default(''),
  ...timestamps
}));

export const selectDocumentSchema = createSelectSchema(document);
export const insertDocumentSchema = createInsertSchema(document);
export const updateDocumentSchema = createInsertSchema(document).partial().extend({ id: z.string().uuid() });

export type Document = typeof document.$inferSelect;
export type DocumentInsert = typeof document.$inferInsert;
