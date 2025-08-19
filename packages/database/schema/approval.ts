import { timestamps } from '../utils/timestamps';
import { user } from './auth';
import { approvalStatusEnum, targetTypeEnum } from './enums';
import { project } from './project';
import { stakeholder } from './stakeholder';
import { stakeholderTemplate } from './stakeholder-template';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const approval = pgTable('approval', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectId: t
    .uuid()
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  targetType: targetTypeEnum().notNull(),
  targetId: t.uuid().notNull(),
  requestedByUserId: t.text().references(() => user.id, { onDelete: 'set null' }),
  requestedByStakeholderId: t.uuid().references(() => stakeholder.id, { onDelete: 'set null' }),
  requiredStakeholderTemplateId: t.uuid().references(() => stakeholderTemplate.id, { onDelete: 'set null' }),
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
