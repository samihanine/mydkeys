import { timestamps } from '../utils/timestamps';
import { documentTemplate } from './document-template';
import { domain } from './domain';
import { documentMemberTemplateAccessLevelEnum } from './enums';
import { memberTemplate } from './member-template';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const documentMemberTemplate = pgTable('document_member_template', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  domainId: t
    .uuid()
    .notNull()
    .references(() => domain.id, { onDelete: 'cascade' }),
  accessLevel: documentMemberTemplateAccessLevelEnum().notNull().default('READ'),
  documentTemplateId: t
    .uuid()
    .notNull()
    .references(() => documentTemplate.id, { onDelete: 'cascade' }),
  memberTemplateId: t
    .uuid()
    .notNull()
    .references(() => memberTemplate.id, { onDelete: 'cascade' }),
  ...timestamps
}));

export const selectDocumentMemberTemplateSchema = createSelectSchema(documentMemberTemplate);
export const insertDocumentMemberTemplateSchema = createInsertSchema(documentMemberTemplate);
export const updateDocumentMemberTemplateSchema = createInsertSchema(documentMemberTemplate)
  .partial()
  .extend({ id: z.string().uuid() });

export type DocumentMemberTemplate = typeof documentMemberTemplate.$inferSelect;
export type DocumentMemberTemplateInsert = typeof documentMemberTemplate.$inferInsert;
