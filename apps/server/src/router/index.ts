import { documentRouter } from './document';
import { fileRouter } from './file';
import { invitationRouter } from './invitation';
import { projectRouter } from './project';
import { stakeholderRouter } from './stakeholder';
import { userRouter } from './user';

export const appRouter = {
  document: documentRouter,
  user: userRouter,
  invitation: invitationRouter,
  stakeholder: stakeholderRouter,
  project: projectRouter,
  file: fileRouter
};

export type AppRouter = typeof appRouter;
