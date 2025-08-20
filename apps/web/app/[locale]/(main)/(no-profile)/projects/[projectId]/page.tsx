import { UpdateProjectPage } from '@/features/project/update-project-page';
import { ReactElement } from 'react';

interface PageProps {
  params: Promise<{ projectId: string }>;
}

export default async function Page({ params }: PageProps): Promise<ReactElement> {
  const { projectId } = await params;
  return <UpdateProjectPage projectId={projectId} />;
}
