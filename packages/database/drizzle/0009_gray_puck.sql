ALTER TABLE "document" DROP CONSTRAINT "document_uploadedBy_user_id_fk";
--> statement-breakpoint
ALTER TABLE "document" ADD COLUMN "uploadedByMemberId" uuid;--> statement-breakpoint
ALTER TABLE "document" ADD COLUMN "deadlineAt" timestamp;--> statement-breakpoint
ALTER TABLE "document" ADD COLUMN "timestamp" timestamp;--> statement-breakpoint
ALTER TABLE "document" ADD CONSTRAINT "document_uploadedByMemberId_member_id_fk" FOREIGN KEY ("uploadedByMemberId") REFERENCES "public"."member"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document" DROP COLUMN "uploadedBy";