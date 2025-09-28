ALTER TABLE "document" DROP CONSTRAINT "document_uploadedByMemberId_member_id_fk";
--> statement-breakpoint
ALTER TABLE "project" DROP CONSTRAINT "project_createdByUserId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "document" ADD COLUMN "createdByMemberId" uuid;--> statement-breakpoint
ALTER TABLE "document" ADD CONSTRAINT "document_createdByMemberId_member_id_fk" FOREIGN KEY ("createdByMemberId") REFERENCES "public"."member"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document" DROP COLUMN "uploadedByMemberId";--> statement-breakpoint
ALTER TABLE "document" DROP COLUMN "uploadedAt";--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN "createdByUserId";