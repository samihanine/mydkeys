import { categoryRouter } from './categories';
import { documentRouter } from './document';
import { documentTemplateRouter } from './document-template';
import { domainRouter } from './domain';
import { fileRouter } from './file';
import { invitationRouter } from './invitation';
import { memberRouter } from './member';
import { memberTemplateRouter } from './member-template';
import { projectRouter } from './project';
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
  memberTemplate: memberTemplateRouter,
  category: categoryRouter
};

export type AppRouter = typeof appRouter;
