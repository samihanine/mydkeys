import { pgEnum } from 'drizzle-orm/pg-core';

export const roleTypeEnum = pgEnum('role_type', ['OWNER', 'ADMIN', 'MEMBER', 'GUEST']);

export const memberKindEnum = pgEnum('member_kind', ['PERSON', 'ORGANIZATION']);

export const documentStatusEnum = pgEnum('document_status', ['MISSING', 'UPLOADED', 'APPROVED', 'REJECTED']);

export const taskStatusEnum = pgEnum('task_status', ['TODO', 'IN_PROGRESS', 'BLOCKED', 'DONE', 'CANCELLED']);

export const notificationChannelEnum = pgEnum('notification_channel', ['EMAIL', 'WEB', 'PUSH']);

export const approvalStatusEnum = pgEnum('approval_status', ['PENDING', 'APPROVED', 'REJECTED']);

export const storageProviderEnum = pgEnum('storage_provider', ['S3', 'GCS', 'AZURE', 'MINIO', 'LOCAL']);

export const targetTypeEnum = pgEnum('target_type', ['DOMAIN', 'DOCUMENT', 'TASK']);

export const documentMemberTemplateAccessLevelEnum = pgEnum('document_member_template_access_level', [
  'READ',
  'WRITE',
  'ADMIN'
]);
