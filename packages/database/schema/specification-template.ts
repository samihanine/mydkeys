import { timestamps } from '../utils/timestamps';
import { domain } from './domain';
import { specificationTemplateTypeEnum } from './enums';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const specificationTemplate = pgTable('specification_template', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  domainId: t
    .uuid()
    .notNull()
    .references(() => domain.id, { onDelete: 'cascade' }),
  key: t.text().notNull(),
  name: t.text().notNull(),
  description: t.text().notNull(),
  isRequired: t.boolean().notNull().default(false),
  type: specificationTemplateTypeEnum().notNull(),
  options: t.text(),
  ...timestamps
}));

export const selectSpecificationTemplateSchema = createSelectSchema(specificationTemplate);
export const insertSpecificationTemplateSchema = createInsertSchema(specificationTemplate);
export const updateSpecificationTemplateSchema = createInsertSchema(specificationTemplate)
  .partial()
  .extend({ id: z.string().uuid() });

export type SpecificationTemplate = typeof specificationTemplate.$inferSelect;
export type SpecificationTemplateInsert = typeof specificationTemplate.$inferInsert;
