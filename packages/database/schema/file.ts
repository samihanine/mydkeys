import { timestamps } from '../utils/timestamps';
import { storageProviderEnum } from './enums';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const file = pgTable('file', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  storageProvider: storageProviderEnum().notNull().default('S3'),
  bucket: t.text().notNull(),
  key: t.text().notNull(),
  filename: t.text().notNull(),
  mime: t.text().notNull(),
  size: t.bigint({ mode: 'number' }).notNull(),
  hash: t.text(),
  ...timestamps
}));

export const selectFileSchema = createSelectSchema(file);
export const insertFileSchema = createInsertSchema(file);
export const updateFileSchema = createInsertSchema(file).partial().extend({ id: z.string().uuid() });

export type File = typeof file.$inferSelect;
export type FileInsert = typeof file.$inferInsert;
