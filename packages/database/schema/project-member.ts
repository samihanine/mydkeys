import { timestamps } from '../utils/timestamps';
import { user } from './auth';
import { projectMemberRoleEnum } from './enums';
import { project } from './project';
import { pgTable } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const projectMember = pgTable('project_member', (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  projectId: t
    .uuid()
    .notNull()
    .references(() => project.id, { onDelete: 'cascade' }),
  userId: t
    .text()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  role: projectMemberRoleEnum().notNull().default('VIEWER'),
  ...timestamps
}));

export const selectProjectMemberSchema = createSelectSchema(projectMember);
export const insertProjectMemberSchema = createInsertSchema(projectMember);
export const updateProjectMemberSchema = createInsertSchema(projectMember).partial().extend({ id: z.string().uuid() });

export type ProjectMember = typeof projectMember.$inferSelect;
export type ProjectMemberInsert = typeof projectMember.$inferInsert;
