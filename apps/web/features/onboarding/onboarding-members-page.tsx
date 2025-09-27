'use client';

import { SeletedMemberTemplatesForm } from '../project/seleted-member-templates-form';
import { useCurrentProject } from '../project/use-current-project';
import { useUpdateProject } from '../project/use-update-project';
import { useCurrentUser } from '@/features/auth/use-current-user';
import { orpc } from '@/lib/orpc';
import { useI18n } from '@/locales/client';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const OnboardingMembersPage = () => {
  const t = useI18n();
  const userQuery = useCurrentUser();
  const updateProjectMutation = useUpdateProject();
  const router = useRouter();
  const queryClient = useQueryClient();
  const projectQuery = useCurrentProject();

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
          <div className='w-full'>
            <SeletedMemberTemplatesForm
              project={projectQuery.data}
              onSubmit={async (values) => {
                await updateProjectMutation.mutateAsync({ ...values, id: projectQuery.data?.id! });

                await queryClient.invalidateQueries(orpc.project.getAll.queryOptions());
                await queryClient.invalidateQueries(orpc.project.getCurrentProject.queryOptions());

                router.push('/onboarding/invitations');
              }}
              onCancel={() => router.push('/onboarding/specifications')}
            />
          </div>
        </>
      )}
    </div>
  );
};
