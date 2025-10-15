'use client';

import { useDocumentsByCurrentProject } from '../document/use-documents-by-current-project';
import { useGroupsByCurrentProject } from '../group/use-groups-by-current-project';
import { useCurrentMember } from '../member/use-current-member';
import { GroupProgressCard } from './group-progress-card';
import { ProgressCard } from './progress-card';
import { useCurrentProject } from '@/features/project/use-current-project';
import { useI18n } from '@/locales/client';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H2 } from '@repo/ui/components/typography';
import Link from 'next/link';

export const DashboardPage = () => {
  const t = useI18n();
  const projectQuery = useCurrentProject();
  const documentsQuery = useDocumentsByCurrentProject();
  const currentMemberQuery = useCurrentMember();
  const groupsQuery = useGroupsByCurrentProject();

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
        <Link href='/documents'>
          <ProgressCard
            className='cursor-pointer hover:scale-105 transition-all duration-300'
            documents={documentsQuery.data ?? []}
          />
        </Link>
      </div>

      {currentMemberQuery.data?.isAdministrator && (
        <div className='flex justify-center gap-4 flex-wrap items-stretch'>
          {groupsQuery.data?.map((group) => (
            <Link href={`/documents?groupId=${group.id}`}>
              <GroupProgressCard
                className='flex-1 cursor-pointer hover:scale-105 transition-all duration-300'
                group={group}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
