import { ProjectLayout } from '@/features/project/project-layout';
import { PropsWithChildren } from 'react';

const RootLayout = ({ children }: PropsWithChildren) => {
  return <ProjectLayout>{children}</ProjectLayout>;
};

export default RootLayout;
