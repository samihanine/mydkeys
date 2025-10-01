import { timestamps } from '../utils/timestamps';
import { group } from './group';
import { member } from './member';
import { project } from './project';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const groupMember = pgTable('group_member', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectId: t
    .uuid()
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  groupId: t
    .uuid()
    .notNull()
    .references(() => group.id, { onDelete: 'cascade' }),
  memberId: t
    .uuid()
    .notNull()
    .references(() => member.id, { onDelete: 'cascade' }),
  ...timestamps
}));

export const selectGroupMemberSchema = createSelectSchema(groupMember);
export const insertGroupMemberSchema = createInsertSchema(groupMember);
export const updateGroupMemberSchema = createInsertSchema(groupMember).partial().extend({ id: z.string().uuid() });

export type GroupMember = typeof groupMember.$inferSelect;
export type GroupMemberInsert = typeof groupMember.$inferInsert;
