'use client';

import { useCurrentUser } from '@/features/auth/use-current-user';
import { ProjectForm } from '@/features/project/project-form';
import { useCreateProject } from '@/features/project/use-create-project';
import { useSelectProject } from '@/features/project/use-select-project';
import { orpc } from '@/lib/orpc';
import { useI18n } from '@/locales/client';
import { Card, CardContent } from '@repo/ui/components/card';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H2, P } from '@repo/ui/components/typography';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const OnboardingProjectPage = () => {
  const t = useI18n();
  const userQuery = useCurrentUser();
  const createProjectMutation = useCreateProject();
  const router = useRouter();
  const queryClient = useQueryClient();
  const selectProjectMutation = useSelectProject();

  useEffect(() => {
    if (!userQuery.data && !userQuery.isFetching) {
      router.push('/login');
    }
  }, [userQuery, router]);

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      {userQuery.isFetching ? (
        <LoadingSpinner />
      ) : (
        <>
          <Card className='w-full'>
            <CardContent>
              <ProjectForm
                onSubmit={async (values) => {
                  const result = await createProjectMutation.mutateAsync(values);

                  await selectProjectMutation.mutateAsync({ id: result.id! });

                  await queryClient.invalidateQueries(orpc.project.getAll.queryOptions());
                  await queryClient.invalidateQueries(orpc.project.getCurrentProject.queryOptions());

                  router.push('/onboarding/specifications');
                }}
                onCancel={() => router.push('/onboarding/project')}
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
