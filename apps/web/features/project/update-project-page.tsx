'use client';

import { ProjectForm } from '@/features/project/project-form';
import { useProjectById } from '@/features/project/use-project-by-id';
import { useUpdateProject } from '@/features/project/use-update-project';
import { useI18n } from '@/locales/client';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H2, P } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const UpdateProjectPage = ({ projectId }: { projectId: string }) => {
  const t = useI18n();
  const updateProjectMutation = useUpdateProject();
  const projectQuery = useProjectById(projectId);
  const router = useRouter();
  if (projectQuery.isFetching || !projectQuery.data) {
    return (
      <div className='flex h-full items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!projectQuery.data) {
    return <div>{t('project.notFound')}</div>;
  }

  return (
    <>
      <H2 className='mb-0 text-3xl font-bold text-gray-800'>
        {t('project.updateTitle')} {projectQuery.data.name}'s project
      </H2>
      <P className='mb-12 text-gray-600'>{t('project.subtitle')}</P>
      <ProjectForm
        project={projectQuery.data}
        onSubmit={async (values) => {
          await updateProjectMutation.mutateAsync({ ...values, id: projectId });
        }}
        onCancel={() => {
          router.back();
        }}
      />
    </>
  );
};
