CREATE TABLE "document_version" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"documentId" uuid NOT NULL,
	"fileId" uuid NOT NULL,
	"uploadedByMemberId" uuid,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "invitation" RENAME COLUMN "invitedBy" TO "invitedByMemberId";--> statement-breakpoint
ALTER TABLE "project" RENAME COLUMN "createdBy" TO "createdByUserId";--> statement-breakpoint
ALTER TABLE "invitation" DROP CONSTRAINT "invitation_invitedBy_member_id_fk";
--> statement-breakpoint
ALTER TABLE "project" DROP CONSTRAINT "project_createdBy_user_id_fk";
--> statement-breakpoint
ALTER TABLE "project" DROP CONSTRAINT "project_imageFileId_file_id_fk";
--> statement-breakpoint
ALTER TABLE "file" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "file" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "file" ADD COLUMN "altText" text;--> statement-breakpoint
ALTER TABLE "file" ADD COLUMN "projectId" uuid;--> statement-breakpoint
ALTER TABLE "file" ADD COLUMN "uploadedByUserId" text;--> statement-breakpoint
ALTER TABLE "document_version" ADD CONSTRAINT "document_version_uploadedByMemberId_member_id_fk" FOREIGN KEY ("uploadedByMemberId") REFERENCES "public"."member"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "file" ADD CONSTRAINT "file_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "file" ADD CONSTRAINT "file_uploadedByUserId_user_id_fk" FOREIGN KEY ("uploadedByUserId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_invitedByMemberId_member_id_fk" FOREIGN KEY ("invitedByMemberId") REFERENCES "public"."member"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_createdByUserId_user_id_fk" FOREIGN KEY ("createdByUserId") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN "imageFileId";