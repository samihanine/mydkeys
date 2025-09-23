ALTER TABLE "domain" DROP COLUMN "defaultProjectStatus";--> statement-breakpoint
ALTER TABLE "project" DROP COLUMN "status";--> statement-breakpoint
DROP TYPE "public"."target_type";--> statement-breakpoint
CREATE TYPE "public"."target_type" AS ENUM('DOMAIN', 'DOCUMENT', 'TASK');--> statement-breakpoint
DROP TYPE "public"."project_status";