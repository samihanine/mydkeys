import { timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
  createdAt: timestamp({ mode: 'string' }).defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).defaultNow(),
  deletedAt: timestamp({ mode: 'string' })
};
