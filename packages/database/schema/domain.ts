import { timestamps } from '../utils/timestamps';
import { user } from './auth';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const domain = pgTable('domain', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  organizationId: t.text(),
  domainKey: t.text().notNull(),
  name: t.text().notNull(),
  version: t.text().notNull().default('1.0.0'),
  hexColor: t.text().notNull().default('#7cce00'),
  description: t.text().default(''),
  isDefault: t.boolean().notNull().default(false),
  createdBy: t.text().references(() => user.id, { onDelete: 'set null' }),
  ...timestamps
}));

export const selectDomainSchema = createSelectSchema(domain);
export const insertDomainSchema = createInsertSchema(domain);
export const updateDomainSchema = createInsertSchema(domain).partial().extend({ id: z.string().uuid() });

export type Domain = typeof domain.$inferSelect;
export type DomainInsert = typeof domain.$inferInsert;
