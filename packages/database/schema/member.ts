import { timestamps } from '../utils/timestamps';
import { user } from './auth';
import { memberKindEnum } from './enums';
import { file } from './file';
import { memberTemplate } from './member-template';
import { project } from './project';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const member = pgTable('member', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectId: t
    .uuid()
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  memberTemplateId: t.uuid().references(() => memberTemplate.id, { onDelete: 'restrict' }),
  displayName: t.text().notNull(),
  kind: memberKindEnum().notNull().default('PERSON'),
  userId: t.text().references(() => user.id, { onDelete: 'set null' }),
  externalEmail: t.text(),
  metaJson: t.jsonb(),
  imageFileId: t.uuid().references(() => file.id, { onDelete: 'set null' }),
  ...timestamps
}));

export const selectMemberSchema = createSelectSchema(member);
export const insertMemberSchema = createInsertSchema(member);
export const updateMemberSchema = createInsertSchema(member).partial().extend({ id: z.string().uuid() });

export type Member = typeof member.$inferSelect;
export type MemberInsert = typeof member.$inferInsert;
