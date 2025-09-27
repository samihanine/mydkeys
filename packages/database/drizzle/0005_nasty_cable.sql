ALTER TABLE "member_template" ADD COLUMN "icon" text DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "member_template" ADD COLUMN "hexColor" text DEFAULT '#7cce00' NOT NULL;--> statement-breakpoint
ALTER TABLE "member_template" DROP COLUMN "slug";