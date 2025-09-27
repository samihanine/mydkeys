import { timestamps } from '../utils/timestamps';
import { member } from './member';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const documentVersion = pgTable('document_version', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  documentId: t.uuid().notNull(),
  fileId: t.uuid().notNull(),
  uploadedByMemberId: t.uuid().references(() => member.id, { onDelete: 'set null' }),
  ...timestamps
}));

export const selectDocumentVersionSchema = createSelectSchema(documentVersion);
export const insertDocumentVersionSchema = createInsertSchema(documentVersion);
export const updateDocumentVersionSchema = createInsertSchema(documentVersion)
  .partial()
  .extend({ id: z.string().uuid() });

export type DocumentVersion = typeof documentVersion.$inferSelect;
export type DocumentVersionInsert = typeof documentVersion.$inferInsert;
