CREATE TYPE "public"."access_type" AS ENUM('PERMANENT', 'TEMPORARY');--> statement-breakpoint
ALTER TABLE "project" DROP CONSTRAINT "project_createdBy_user_id_fk";
--> statement-breakpoint
ALTER TABLE "project" ALTER COLUMN "createdBy" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "member" ADD COLUMN "title" text;--> statement-breakpoint
ALTER TABLE "member" ADD COLUMN "accessType" "access_type" DEFAULT 'PERMANENT' NOT NULL;--> statement-breakpoint
ALTER TABLE "member" ADD COLUMN "accessExpiresAt" timestamp;--> statement-breakpoint
ALTER TABLE "member_template" ADD COLUMN "isDefaultForNewMembers" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "member_template" ADD COLUMN "isDefaultForOwners" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;