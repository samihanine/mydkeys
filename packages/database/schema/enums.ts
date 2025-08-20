import { pgEnum } from 'drizzle-orm/pg-core';

export const roleTypeEnum = pgEnum('role_type', ['OWNER', 'ADMIN', 'MEMBER', 'GUEST']);

export const projectStatusEnum = pgEnum('project_status', ['DRAFT', 'ACTIVE', 'ON_HOLD', 'CLOSED']);

export const stakeholderKindEnum = pgEnum('stakeholder_kind', ['PERSON', 'ORGANIZATION']);

export const documentStatusEnum = pgEnum('document_status', ['MISSING', 'UPLOADED', 'APPROVED', 'REJECTED']);

export const taskStatusEnum = pgEnum('task_status', ['TODO', 'IN_PROGRESS', 'BLOCKED', 'DONE', 'CANCELLED']);

export const notificationChannelEnum = pgEnum('notification_channel', ['EMAIL', 'WEB', 'PUSH']);

export const approvalStatusEnum = pgEnum('approval_status', ['PENDING', 'APPROVED', 'REJECTED']);

export const storageProviderEnum = pgEnum('storage_provider', ['S3', 'GCS', 'AZURE', 'MINIO', 'LOCAL']);

export const targetTypeEnum = pgEnum('target_type', ['PROJECT', 'DOCUMENT', 'TASK']);
