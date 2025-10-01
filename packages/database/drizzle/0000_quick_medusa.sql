CREATE TYPE "public"."access_type" AS ENUM('PERMANENT', 'TEMPORARY');--> statement-breakpoint
CREATE TYPE "public"."approval_status" AS ENUM('PENDING', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."document_status" AS ENUM('MISSING', 'UPLOADED', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."member_kind" AS ENUM('PERSON', 'ORGANIZATION');--> statement-breakpoint
CREATE TYPE "public"."notification_channel" AS ENUM('EMAIL', 'WEB', 'PUSH');--> statement-breakpoint
CREATE TYPE "public"."permission" AS ENUM('VIEW', 'EDIT', 'COMMENT', 'APPROVE', 'SHARE', 'MANAGE', 'OWNER');--> statement-breakpoint
CREATE TYPE "public"."role_type" AS ENUM('OWNER', 'ADMIN', 'MEMBER', 'GUEST');--> statement-breakpoint
CREATE TYPE "public"."specification_template_type" AS ENUM('TEXT', 'NUMBER', 'BOOLEAN', 'DATE', 'SELECT', 'MULTI_SELECT');--> statement-breakpoint
CREATE TYPE "public"."storage_provider" AS ENUM('S3', 'GCS', 'AZURE', 'MINIO', 'LOCAL');--> statement-breakpoint
CREATE TYPE "public"."target_type" AS ENUM('DOMAIN', 'DOCUMENT', 'TASK');--> statement-breakpoint
CREATE TYPE "public"."task_status" AS ENUM('TODO', 'IN_PROGRESS', 'BLOCKED', 'DONE', 'CANCELLED');--> statement-breakpoint
CREATE TABLE "assignment_template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domainId" uuid NOT NULL,
	"documentTemplateId" uuid NOT NULL,
	"groupTemplateId" uuid NOT NULL,
	"permission" "permission" NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "assignment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"documentId" uuid,
	"groupId" uuid NOT NULL,
	"folderId" uuid,
	"permission" "permission" NOT NULL,
	"assignmentTemplateId" uuid NOT NULL,
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
CREATE TABLE "category_document" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"categoryId" uuid NOT NULL,
	"documentId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "category_template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domainId" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '',
	"hexColor" text DEFAULT '#7cce00' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"categoryTemplateId" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '',
	"hexColor" text DEFAULT '#7cce00' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "comment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"documentId" uuid NOT NULL,
	"authorUserId" text,
	"authorMemberId" uuid,
	"body" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "condition" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"categoryId" uuid NOT NULL,
	"specificationTemplateId" uuid NOT NULL,
	"value" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "document_template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domainId" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '',
	"isRequired" boolean DEFAULT true NOT NULL,
	"mimeWhitelist" text DEFAULT '',
	"exampleUrl" text,
	"tags" text DEFAULT '',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "document" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"documentTemplateId" uuid,
	"createdByMemberId" uuid,
	"folderId" uuid,
	"name" text NOT NULL,
	"description" text DEFAULT '',
	"mimeWhitelist" text DEFAULT '',
	"exampleUrl" text,
	"tags" text DEFAULT '',
	"isRequired" boolean DEFAULT true NOT NULL,
	"status" "document_status" DEFAULT 'MISSING' NOT NULL,
	"fileId" uuid,
	"notes" text DEFAULT '',
	"deadlineAt" timestamp,
	"timestamp" timestamp,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "domain" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizationId" text,
	"domainKey" text NOT NULL,
	"name" text NOT NULL,
	"version" text DEFAULT '1.0.0' NOT NULL,
	"hexColor" text DEFAULT '#7cce00' NOT NULL,
	"description" text DEFAULT '',
	"isDefault" boolean DEFAULT false NOT NULL,
	"createdBy" text,
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
	"name" text NOT NULL,
	"description" text,
	"altText" text,
	"projectId" uuid,
	"uploadedByUserId" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "folder_template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domainId" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '',
	"isAdministrator" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "folder" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"folderTemplateId" uuid,
	"createdByMemberId" uuid,
	"parentFolderId" uuid,
	"name" text NOT NULL,
	"description" text DEFAULT '',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "group_member" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"groupId" uuid NOT NULL,
	"memberId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "group_template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domainId" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '',
	"isAdministrator" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "group" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"groupTemplateId" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '',
	"isAdministrator" boolean DEFAULT false NOT NULL,
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
	"memberId" uuid NOT NULL,
	"invitedByMemberId" uuid,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domainId" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '',
	"selectedMemberTemplateIds" uuid[],
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "member" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"displayName" text NOT NULL,
	"kind" "member_kind" DEFAULT 'PERSON' NOT NULL,
	"title" text,
	"accessType" "access_type" DEFAULT 'PERMANENT' NOT NULL,
	"accessExpiresAt" timestamp,
	"userId" text,
	"externalEmail" text,
	"metaJson" jsonb,
	"imageFileId" uuid,
	"isAdministrator" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "specification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"value" text NOT NULL,
	"specificationTemplateId" uuid,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "specification_template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domainId" uuid NOT NULL,
	"key" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"isRequired" boolean DEFAULT false NOT NULL,
	"type" "specification_template_type" NOT NULL,
	"options" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "assignment_template" ADD CONSTRAINT "assignment_template_domainId_domain_id_fk" FOREIGN KEY ("domainId") REFERENCES "public"."domain"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_document" ADD CONSTRAINT "category_document_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_document" ADD CONSTRAINT "category_document_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_document" ADD CONSTRAINT "category_document_documentId_document_id_fk" FOREIGN KEY ("documentId") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_template" ADD CONSTRAINT "category_template_domainId_domain_id_fk" FOREIGN KEY ("domainId") REFERENCES "public"."domain"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_categoryTemplateId_category_template_id_fk" FOREIGN KEY ("categoryTemplateId") REFERENCES "public"."category_template"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_authorUserId_user_id_fk" FOREIGN KEY ("authorUserId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_authorMemberId_member_id_fk" FOREIGN KEY ("authorMemberId") REFERENCES "public"."member"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "condition" ADD CONSTRAINT "condition_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "condition" ADD CONSTRAINT "condition_specificationTemplateId_specification_template_id_fk" FOREIGN KEY ("specificationTemplateId") REFERENCES "public"."specification_template"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_template" ADD CONSTRAINT "document_template_domainId_domain_id_fk" FOREIGN KEY ("domainId") REFERENCES "public"."domain"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document" ADD CONSTRAINT "document_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document" ADD CONSTRAINT "document_documentTemplateId_document_template_id_fk" FOREIGN KEY ("documentTemplateId") REFERENCES "public"."document_template"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document" ADD CONSTRAINT "document_createdByMemberId_member_id_fk" FOREIGN KEY ("createdByMemberId") REFERENCES "public"."member"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document" ADD CONSTRAINT "document_folderId_folder_id_fk" FOREIGN KEY ("folderId") REFERENCES "public"."folder"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document" ADD CONSTRAINT "document_fileId_file_id_fk" FOREIGN KEY ("fileId") REFERENCES "public"."file"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "domain" ADD CONSTRAINT "domain_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "file" ADD CONSTRAINT "file_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "file" ADD CONSTRAINT "file_uploadedByUserId_user_id_fk" FOREIGN KEY ("uploadedByUserId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "folder_template" ADD CONSTRAINT "folder_template_domainId_domain_id_fk" FOREIGN KEY ("domainId") REFERENCES "public"."domain"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "folder" ADD CONSTRAINT "folder_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "folder" ADD CONSTRAINT "folder_folderTemplateId_folder_template_id_fk" FOREIGN KEY ("folderTemplateId") REFERENCES "public"."folder_template"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "folder" ADD CONSTRAINT "folder_createdByMemberId_member_id_fk" FOREIGN KEY ("createdByMemberId") REFERENCES "public"."member"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_member" ADD CONSTRAINT "group_member_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_member" ADD CONSTRAINT "group_member_groupId_group_id_fk" FOREIGN KEY ("groupId") REFERENCES "public"."group"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_member" ADD CONSTRAINT "group_member_memberId_member_id_fk" FOREIGN KEY ("memberId") REFERENCES "public"."member"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_template" ADD CONSTRAINT "group_template_domainId_domain_id_fk" FOREIGN KEY ("domainId") REFERENCES "public"."domain"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group" ADD CONSTRAINT "group_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_memberId_member_id_fk" FOREIGN KEY ("memberId") REFERENCES "public"."member"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_invitedByMemberId_member_id_fk" FOREIGN KEY ("invitedByMemberId") REFERENCES "public"."member"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_domainId_domain_id_fk" FOREIGN KEY ("domainId") REFERENCES "public"."domain"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_imageFileId_file_id_fk" FOREIGN KEY ("imageFileId") REFERENCES "public"."file"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "specification" ADD CONSTRAINT "specification_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "specification" ADD CONSTRAINT "specification_specificationTemplateId_specification_template_id_fk" FOREIGN KEY ("specificationTemplateId") REFERENCES "public"."specification_template"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "specification_template" ADD CONSTRAINT "specification_template_domainId_domain_id_fk" FOREIGN KEY ("domainId") REFERENCES "public"."domain"("id") ON DELETE cascade ON UPDATE no action;