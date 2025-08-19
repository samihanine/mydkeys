import { timestamps } from '../utils/timestamps';
import { user } from './auth';
import { stakeholderKindEnum } from './enums';
import { file } from './file';
import { project } from './project';
import { stakeholderTemplate } from './stakeholder-template';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const stakeholder = pgTable('stakeholder', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectId: t
    .uuid()
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  stakeholderTemplateId: t.uuid().references(() => stakeholderTemplate.id, { onDelete: 'restrict' }),
  displayName: t.text().notNull(),
  kind: stakeholderKindEnum().notNull().default('PERSON'),
  userId: t.text().references(() => user.id, { onDelete: 'set null' }),
  externalEmail: t.text(),
  metaJson: t.jsonb(),
  imageFileId: t.uuid().references(() => file.id, { onDelete: 'set null' }),
  ...timestamps
}));

export const selectStakeholderSchema = createSelectSchema(stakeholder);
export const insertStakeholderSchema = createInsertSchema(stakeholder);
export const updateStakeholderSchema = createInsertSchema(stakeholder).partial().extend({ id: z.string().uuid() });

export type Stakeholder = typeof stakeholder.$inferSelect;
export type StakeholderInsert = typeof stakeholder.$inferInsert;
