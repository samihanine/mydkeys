CREATE TYPE "public"."document_member_template_access_level" AS ENUM('READ', 'WRITE', 'ADMIN');--> statement-breakpoint
CREATE TABLE "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domainId" uuid NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"hexColor" text DEFAULT '#7cce00' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "document_member_template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domainId" uuid NOT NULL,
	"accessLevel" "document_member_template_access_level" DEFAULT 'READ' NOT NULL,
	"documentTemplateId" uuid NOT NULL,
	"memberTemplateId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "document_template" DROP CONSTRAINT "document_template_requiredForMemberTemplateId_member_template_id_fk";
--> statement-breakpoint
ALTER TABLE "document_template" ALTER COLUMN "mimeWhitelist" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "document_template" ALTER COLUMN "mimeWhitelist" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "document_template" ADD COLUMN "categoryId" uuid;--> statement-breakpoint
ALTER TABLE "document_template" ADD COLUMN "tags" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "domain" ADD COLUMN "hexColor" text DEFAULT '#7cce00' NOT NULL;--> statement-breakpoint
ALTER TABLE "member_template" ADD COLUMN "categoryId" uuid;--> statement-breakpoint
ALTER TABLE "member_template" ADD COLUMN "tags" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_domainId_domain_id_fk" FOREIGN KEY ("domainId") REFERENCES "public"."domain"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_member_template" ADD CONSTRAINT "document_member_template_domainId_domain_id_fk" FOREIGN KEY ("domainId") REFERENCES "public"."domain"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_member_template" ADD CONSTRAINT "document_member_template_documentTemplateId_document_template_id_fk" FOREIGN KEY ("documentTemplateId") REFERENCES "public"."document_template"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_member_template" ADD CONSTRAINT "document_member_template_memberTemplateId_member_template_id_fk" FOREIGN KEY ("memberTemplateId") REFERENCES "public"."member_template"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_template" ADD CONSTRAINT "document_template_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_template" ADD CONSTRAINT "member_template_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_template" DROP COLUMN "category";--> statement-breakpoint
ALTER TABLE "document_template" DROP COLUMN "requiredForMemberTemplateId";