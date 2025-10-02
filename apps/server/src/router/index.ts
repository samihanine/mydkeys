import { assignmentRouter } from './assignment';
import { assignmentTemplateRouter } from './assignment-template';
import { categoryRouter } from './category';
import { categoryDocumentRouter } from './category-document';
import { categoryTemplateRouter } from './category-template';
import { categoryTemplateDocumentTemplateRouter } from './category-template-document-template';
import { documentRouter } from './document';
import { documentTemplateRouter } from './document-template';
import { domainRouter } from './domain';
import { fileRouter } from './file';
import { folderRouter } from './folder';
import { folderTemplateRouter } from './folder-template';
import { groupRouter } from './group';
import { groupTemplateRouter } from './group-template';
import { invitationRouter } from './invitation';
import { memberRouter } from './member';
import { projectRouter } from './project';
import { specificationRouter } from './specification';
import { specificationTemplateRouter } from './specification-template';
import { userRouter } from './user';

export const appRouter = {
  document: documentRouter,
  user: userRouter,
  invitation: invitationRouter,
  member: memberRouter,
  project: projectRouter,
  file: fileRouter,
  domain: domainRouter,
  documentTemplate: documentTemplateRouter,
  specificationTemplate: specificationTemplateRouter,
  specification: specificationRouter,
  category: categoryRouter,
  group: groupRouter,
  groupTemplate: groupTemplateRouter,
  folderTemplate: folderTemplateRouter,
  folder: folderRouter,
  categoryTemplate: categoryTemplateRouter,
  assignmentTemplate: assignmentTemplateRouter,
  assignment: assignmentRouter,
  categoryTemplateDocumentTemplate: categoryTemplateDocumentTemplateRouter,
  categoryDocument: categoryDocumentRouter
};

export type AppRouter = typeof appRouter;
