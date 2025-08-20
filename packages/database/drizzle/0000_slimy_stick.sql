CREATE TYPE "public"."approval_status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."document_status" AS ENUM('MISSING', 'UPLOADED', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."notification_channel" AS ENUM('EMAIL', 'WEB', 'PUSH');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('DRAFT', 'ACTIVE', 'ON_HOLD', 'CLOSED');--> statement-breakpoint
CREATE TYPE "public"."role_type" AS ENUM('OWNER', 'ADMIN', 'MEMBER', 'GUEST');--> statement-breakpoint
CREATE TYPE "public"."stakeholder_kind" AS ENUM('PERSON', 'ORGANIZATION');--> statement-breakpoint
CREATE TYPE "public"."storage_provider" AS ENUM('S3', 'GCS', 'AZURE', 'MINIO', 'LOCAL');--> statement-breakpoint
CREATE TYPE "public"."target_type" AS ENUM('PROJECT', 'DOCUMENT', 'TASK');--> statement-breakpoint
CREATE TYPE "public"."task_status" AS ENUM('TODO', 'IN_PROGRESS', 'BLOCKED', 'DONE', 'CANCELLED');--> statement-breakpoint
CREATE TABLE "approval" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"targetType" "target_type" NOT NULL,
	"targetId" uuid NOT NULL,
	"requestedByUserId" text,
	"requestedByStakeholderId" uuid,
	"requiredStakeholderTemplateId" uuid,
	"status" "approval_status" DEFAULT 'PENDING' NOT NULL,
	"decidedByUserId" text,
	"decidedAt" timestamp,
	"comment" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"impersonated_by" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"stripe_customer_id" text,
	"role" text,
	"banned" boolean,
	"ban_reason" text,
	"ban_expires" timestamp,
	"selected_project_id" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "comment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"targetType" "target_type" NOT NULL,
	"targetId" uuid NOT NULL,
	"authorUserId" text,
	"authorStakeholderId" uuid,
	"body" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "document_template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectTemplateId" uuid NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"category" text,
	"requiredForStakeholderTemplateId" uuid,
	"isRequired" boolean DEFAULT true NOT NULL,
	"mimeWhitelist" text[],
	"exampleUrl" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "document" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"documentTemplateId" uuid NOT NULL,
	"stakeholderId" uuid,
	"status" "document_status" DEFAULT 'MISSING' NOT NULL,
	"fileId" uuid,
	"uploadedBy" text,
	"uploadedAt" timestamp,
	"notes" text DEFAULT '',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "file" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"storageProvider" "storage_provider" DEFAULT 'S3' NOT NULL,
	"bucket" text NOT NULL,
	"key" text NOT NULL,
	"filename" text NOT NULL,
	"mime" text NOT NULL,
	"size" bigint NOT NULL,
	"hash" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "form_submission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"formTemplateId" uuid NOT NULL,
	"stakeholderId" uuid,
	"submittedByUserId" text,
	"valuesJson" jsonb NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "form_template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectTemplateId" uuid NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"schemaJson" jsonb NOT NULL,
	"defaultValuesJson" jsonb,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizationId" text NOT NULL,
	"projectTemplateId" uuid NOT NULL,
	"name" text NOT NULL,
	"status" "project_status" DEFAULT 'ACTIVE' NOT NULL,
	"createdBy" text,
	"imageFileId" uuid,
	"description" text DEFAULT '',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "invitation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"accessGrantedAt" timestamp,
	"invitedAt" timestamp DEFAULT now() NOT NULL,
	"token" uuid DEFAULT gen_random_uuid() NOT NULL,
	"stakeholderId" uuid NOT NULL,
	"invitedBy" uuid,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "project_template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizationId" text,
	"domainKey" text NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"version" text DEFAULT '1.0.0' NOT NULL,
	"description" text DEFAULT '',
	"isDefault" boolean DEFAULT false NOT NULL,
	"createdBy" text,
	"defaultProjectStatus" "project_status" DEFAULT 'ACTIVE',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "stakeholder_template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectTemplateId" uuid NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"kind" "stakeholder_kind" DEFAULT 'PERSON' NOT NULL,
	"isRequired" boolean DEFAULT false NOT NULL,
	"maxCount" integer,
	"permissionsDefault" text[],
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "task_template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectTemplateId" uuid NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text DEFAULT '',
	"position" integer DEFAULT 0 NOT NULL,
	"durationEstDays" integer,
	"dependsOn" uuid[],
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "stakeholder" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"stakeholderTemplateId" uuid,
	"displayName" text NOT NULL,
	"kind" "stakeholder_kind" DEFAULT 'PERSON' NOT NULL,
	"userId" text,
	"externalEmail" text,
	"metaJson" jsonb,
	"imageFileId" uuid,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "task" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"taskTemplateId" uuid,
	"title" text NOT NULL,
	"status" "task_status" DEFAULT 'TODO' NOT NULL,
	"assigneeStakeholderId" uuid,
	"assigneeUserId" text,
	"dueAt" timestamp,
	"position" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "approval" ADD CONSTRAINT "approval_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "approval" ADD CONSTRAINT "approval_requestedByUserId_user_id_fk" FOREIGN KEY ("requestedByUserId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "approval" ADD CONSTRAINT "approval_requestedByStakeholderId_stakeholder_id_fk" FOREIGN KEY ("requestedByStakeholderId") REFERENCES "public"."stakeholder"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "approval" ADD CONSTRAINT "approval_requiredStakeholderTemplateId_stakeholder_template_id_fk" FOREIGN KEY ("requiredStakeholderTemplateId") REFERENCES "public"."stakeholder_template"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "approval" ADD CONSTRAINT "approval_decidedByUserId_user_id_fk" FOREIGN KEY ("decidedByUserId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_authorUserId_user_id_fk" FOREIGN KEY ("authorUserId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_authorStakeholderId_stakeholder_id_fk" FOREIGN KEY ("authorStakeholderId") REFERENCES "public"."stakeholder"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_template" ADD CONSTRAINT "document_template_projectTemplateId_project_template_id_fk" FOREIGN KEY ("projectTemplateId") REFERENCES "public"."project_template"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_template" ADD CONSTRAINT "document_template_requiredForStakeholderTemplateId_stakeholder_template_id_fk" FOREIGN KEY ("requiredForStakeholderTemplateId") REFERENCES "public"."stakeholder_template"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document" ADD CONSTRAINT "document_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document" ADD CONSTRAINT "document_documentTemplateId_document_template_id_fk" FOREIGN KEY ("documentTemplateId") REFERENCES "public"."document_template"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document" ADD CONSTRAINT "document_stakeholderId_stakeholder_id_fk" FOREIGN KEY ("stakeholderId") REFERENCES "public"."stakeholder"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document" ADD CONSTRAINT "document_fileId_file_id_fk" FOREIGN KEY ("fileId") REFERENCES "public"."file"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document" ADD CONSTRAINT "document_uploadedBy_user_id_fk" FOREIGN KEY ("uploadedBy") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_submission" ADD CONSTRAINT "form_submission_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_submission" ADD CONSTRAINT "form_submission_formTemplateId_form_template_id_fk" FOREIGN KEY ("formTemplateId") REFERENCES "public"."form_template"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_submission" ADD CONSTRAINT "form_submission_stakeholderId_stakeholder_id_fk" FOREIGN KEY ("stakeholderId") REFERENCES "public"."stakeholder"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_submission" ADD CONSTRAINT "form_submission_submittedByUserId_user_id_fk" FOREIGN KEY ("submittedByUserId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_template" ADD CONSTRAINT "form_template_projectTemplateId_project_template_id_fk" FOREIGN KEY ("projectTemplateId") REFERENCES "public"."project_template"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_projectTemplateId_project_template_id_fk" FOREIGN KEY ("projectTemplateId") REFERENCES "public"."project_template"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_imageFileId_file_id_fk" FOREIGN KEY ("imageFileId") REFERENCES "public"."file"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_stakeholderId_stakeholder_id_fk" FOREIGN KEY ("stakeholderId") REFERENCES "public"."stakeholder"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_invitedBy_stakeholder_id_fk" FOREIGN KEY ("invitedBy") REFERENCES "public"."stakeholder"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_template" ADD CONSTRAINT "project_template_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stakeholder_template" ADD CONSTRAINT "stakeholder_template_projectTemplateId_project_template_id_fk" FOREIGN KEY ("projectTemplateId") REFERENCES "public"."project_template"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_template" ADD CONSTRAINT "task_template_projectTemplateId_project_template_id_fk" FOREIGN KEY ("projectTemplateId") REFERENCES "public"."project_template"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stakeholder" ADD CONSTRAINT "stakeholder_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stakeholder" ADD CONSTRAINT "stakeholder_stakeholderTemplateId_stakeholder_template_id_fk" FOREIGN KEY ("stakeholderTemplateId") REFERENCES "public"."stakeholder_template"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stakeholder" ADD CONSTRAINT "stakeholder_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stakeholder" ADD CONSTRAINT "stakeholder_imageFileId_file_id_fk" FOREIGN KEY ("imageFileId") REFERENCES "public"."file"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_taskTemplateId_task_template_id_fk" FOREIGN KEY ("taskTemplateId") REFERENCES "public"."task_template"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_assigneeStakeholderId_stakeholder_id_fk" FOREIGN KEY ("assigneeStakeholderId") REFERENCES "public"."stakeholder"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_assigneeUserId_user_id_fk" FOREIGN KEY ("assigneeUserId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;