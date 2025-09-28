'use client';

import { useDocuments } from '../document/use-documents';
import { useCurrentMember } from '../member/use-current-member';
import { MemberProgressCard } from './member-progress-card';
import { ProgressCard } from './progress-card';
import { useCurrentProject } from '@/features/project/use-current-project';
import { useI18n } from '@/locales/client';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H2 } from '@repo/ui/components/typography';

export const DashboardPage = () => {
  const t = useI18n();
  const projectQuery = useCurrentProject();
  const documentsQuery = useDocuments();
  const currentMemberQuery = useCurrentMember();

  if (projectQuery.isFetching || documentsQuery.isFetching || currentMemberQuery.isFetching) {
    return (
      <div className='flex items-center justify-center h-full'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!projectQuery.data) {
    return null;
  }

  const projectName = `${projectQuery.data?.name}`;

  return (
    <div className='flex flex-col gap-8 pb-8'>
      <div className='text-center'>
        <H2>{t('dashboard.welcome', { name: projectName })} !</H2>
      </div>

      <div className='flex justify-center'>
        <ProgressCard documents={documentsQuery.data ?? []} />
      </div>

      <MemberProgressCard />
    </div>
  );
};
