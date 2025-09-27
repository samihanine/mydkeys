import { timestamps } from '../utils/timestamps';
import { member } from './member';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const invitation = pgTable('invitation', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  accessGrantedAt: t.timestamp({ mode: 'string' }),
  invitedAt: t.timestamp({ mode: 'string' }).notNull().defaultNow(),
  token: t.uuid().notNull().defaultRandom(),
  memberId: t
    .uuid()
    .notNull()
    .references(() => member.id, { onDelete: 'cascade' }),
  invitedByMemberId: t.uuid().references(() => member.id, { onDelete: 'set null' }),
  ...timestamps
}));

export const selectInvitationSchema = createSelectSchema(invitation);
export const insertInvitationSchema = createInsertSchema(invitation);
export const updateInvitationSchema = createInsertSchema(invitation).partial().extend({
  id: z.string().uuid()
});

export type Invitation = typeof invitation.$inferSelect;
export type InvitationInsert = typeof invitation.$inferInsert;
