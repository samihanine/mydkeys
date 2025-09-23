import { timestamps } from '../utils/timestamps';
import { user } from './auth';
import { approvalStatusEnum } from './enums';
import { member } from './member';
import { memberTemplate } from './member-template';
import { project } from './project';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const approval = pgTable('approval', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectId: t
    .uuid()
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  documentId: t.uuid().notNull(),
  requestedByUserId: t.text().references(() => user.id, { onDelete: 'set null' }),
  requestedByMemberId: t.uuid().references(() => member.id, { onDelete: 'set null' }),
  requiredMemberTemplateId: t.uuid().references(() => memberTemplate.id, { onDelete: 'set null' }),
  status: approvalStatusEnum().notNull().default('PENDING'),
  decidedByUserId: t.text().references(() => user.id, { onDelete: 'set null' }),
  decidedAt: t.timestamp({ mode: 'string' }),
  comment: t.text(),
  ...timestamps
}));

export const selectApprovalSchema = createSelectSchema(approval);
export const insertApprovalSchema = createInsertSchema(approval);
export const updateApprovalSchema = createInsertSchema(approval).partial().extend({ id: z.string().uuid() });

export type Approval = typeof approval.$inferSelect;
export type ApprovalInsert = typeof approval.$inferInsert;
