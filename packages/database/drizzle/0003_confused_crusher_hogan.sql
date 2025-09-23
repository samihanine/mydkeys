CREATE TYPE "public"."document_member_template_role" AS ENUM('VIEWER', 'EDITOR', 'APPROVER', 'ADMINISTRATOR');--> statement-breakpoint
CREATE TYPE "public"."specification_template_type" AS ENUM('TEXT', 'NUMBER', 'BOOLEAN', 'DATE', 'SELECT', 'MULTI_SELECT');--> statement-breakpoint
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
ALTER TABLE "document" ALTER COLUMN "documentTemplateId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "document_member_template" ADD COLUMN "role" "document_member_template_role" DEFAULT 'EDITOR' NOT NULL;--> statement-breakpoint
ALTER TABLE "specification" ADD CONSTRAINT "specification_projectId_project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."project"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "specification" ADD CONSTRAINT "specification_specificationTemplateId_specification_template_id_fk" FOREIGN KEY ("specificationTemplateId") REFERENCES "public"."specification_template"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "specification_template" ADD CONSTRAINT "specification_template_domainId_domain_id_fk" FOREIGN KEY ("domainId") REFERENCES "public"."domain"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "document_member_template" DROP COLUMN "accessLevel";--> statement-breakpoint
DROP TYPE "public"."document_member_template_access_level";