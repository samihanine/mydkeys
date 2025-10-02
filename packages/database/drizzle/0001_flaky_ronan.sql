CREATE TABLE "category_template_document_template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domainId" uuid NOT NULL,
	"categoryTemplateId" uuid NOT NULL,
	"documentTemplateId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "condition" DROP CONSTRAINT "condition_categoryId_category_id_fk";
--> statement-breakpoint
ALTER TABLE "specification" DROP CONSTRAINT "specification_specificationTemplateId_specification_template_id_fk";
--> statement-breakpoint
ALTER TABLE "assignment" ALTER COLUMN "assignmentTemplateId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "categoryTemplateId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "group" ALTER COLUMN "groupTemplateId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "assignment" ADD COLUMN "expiresAt" timestamp;--> statement-breakpoint
ALTER TABLE "category_document" ADD COLUMN "categoryTemplateDocumentTemplateId" uuid;--> statement-breakpoint
ALTER TABLE "condition" ADD COLUMN "categoryTemplateId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "category_template_document_template" ADD CONSTRAINT "category_template_document_template_domainId_domain_id_fk" FOREIGN KEY ("domainId") REFERENCES "public"."domain"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_template_document_template" ADD CONSTRAINT "category_template_document_template_categoryTemplateId_category_template_id_fk" FOREIGN KEY ("categoryTemplateId") REFERENCES "public"."category_template"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_template_document_template" ADD CONSTRAINT "category_template_document_template_documentTemplateId_document_template_id_fk" FOREIGN KEY ("documentTemplateId") REFERENCES "public"."document_template"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_document" ADD CONSTRAINT "category_document_categoryTemplateDocumentTemplateId_category_template_document_template_id_fk" FOREIGN KEY ("categoryTemplateDocumentTemplateId") REFERENCES "public"."category_template_document_template"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "condition" ADD CONSTRAINT "condition_categoryTemplateId_category_template_id_fk" FOREIGN KEY ("categoryTemplateId") REFERENCES "public"."category_template"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group" ADD CONSTRAINT "group_groupTemplateId_group_template_id_fk" FOREIGN KEY ("groupTemplateId") REFERENCES "public"."group_template"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "specification" ADD CONSTRAINT "specification_specificationTemplateId_specification_template_id_fk" FOREIGN KEY ("specificationTemplateId") REFERENCES "public"."specification_template"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "condition" DROP COLUMN "categoryId";