import { timestamps } from '../utils/timestamps';
import { category } from './category';
import { domain } from './domain';
import { memberKindEnum } from './enums';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const memberTemplate = pgTable('member_template', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  categoryId: t.uuid().references(() => category.id, { onDelete: 'cascade' }),
  domainId: t
    .uuid()
    .notNull()
    .references(() => domain.id, { onDelete: 'cascade' }),
  name: t.text().notNull(),
  kind: memberKindEnum().notNull().default('PERSON'),
  isRequired: t.boolean().notNull().default(false),
  maxCount: t.integer(),
  permissionsDefault: t.text().array(),
  tags: t.text().default(''),
  icon: t.text().notNull().default('user'),
  hexColor: t.text().notNull().default('#7cce00'),
  isDefaultForNewMembers: t.boolean().notNull().default(false),
  isDefaultForOwners: t.boolean().notNull().default(false),
  ...timestamps
}));

export const selectMemberTemplateSchema = createSelectSchema(memberTemplate);
export const insertMemberTemplateSchema = createInsertSchema(memberTemplate);
export const updateMemberTemplateSchema = createInsertSchema(memberTemplate)
  .partial()
  .extend({ id: z.string().uuid() });

export type MemberTemplate = typeof memberTemplate.$inferSelect;
export type MemberTemplateInsert = typeof memberTemplate.$inferInsert;
