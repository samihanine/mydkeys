import { timestamps } from '../utils/timestamps';
import { user } from './auth';
import { targetTypeEnum } from './enums';
import { project } from './project';
import { stakeholder } from './stakeholder';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const comment = pgTable('comment', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectId: t
    .uuid()
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  targetType: targetTypeEnum().notNull(),
  targetId: t.uuid().notNull(),
  authorUserId: t.text().references(() => user.id, { onDelete: 'set null' }),
  authorStakeholderId: t.uuid().references(() => stakeholder.id, { onDelete: 'set null' }),
  body: t.text().notNull(),
  ...timestamps
}));

export const selectCommentSchema = createSelectSchema(comment);
export const insertCommentSchema = createInsertSchema(comment);
export const updateCommentSchema = createInsertSchema(comment).partial().extend({ id: z.string().uuid() });

export type Comment = typeof comment.$inferSelect;
export type CommentInsert = typeof comment.$inferInsert;
