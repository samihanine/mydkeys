import { timestamps } from '../utils/timestamps';
import { user } from './auth';
import { formTemplate } from './form-template';
import { project } from './project';
import { stakeholder } from './stakeholder';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const formSubmission = pgTable('form_submission', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectId: t
    .uuid()
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  formTemplateId: t
    .uuid()
    .notNull()
    .references(() => formTemplate.id, { onDelete: 'set null' }),
  stakeholderId: t.uuid().references(() => stakeholder.id, { onDelete: 'set null' }),
  submittedByUserId: t.text().references(() => user.id, { onDelete: 'set null' }),
  valuesJson: t.jsonb().notNull(),
  ...timestamps
}));

export const selectFormSubmissionSchema = createSelectSchema(formSubmission);
export const insertFormSubmissionSchema = createInsertSchema(formSubmission);
export const updateFormSubmissionSchema = createInsertSchema(formSubmission)
  .partial()
  .extend({ id: z.string().uuid() });

export type FormSubmission = typeof formSubmission.$inferSelect;
export type FormSubmissionInsert = typeof formSubmission.$inferInsert;
