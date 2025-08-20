'use client';

import { useDocuments } from '../document/use-documents';
import { useCurrentStakeholder } from '../stakeholder/use-current-stakeholder';
import { ChecklistCard, ChecklistItem } from './checklist-card';
import { NumberCard } from './number-card';
import { useCurrentProject } from '@/features/project/use-current-project';
import { useI18n } from '@/locales/client';
import { DocumentIcon } from '@heroicons/react/24/solid';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H2 } from '@repo/ui/components/typography';

export const DashboardPage = () => {
  const t = useI18n();
  const projectQuery = useCurrentProject();
  const documentsQuery = useDocuments();
  const currentStakeholderQuery = useCurrentStakeholder();

  if (projectQuery.isFetching || documentsQuery.isFetching || currentStakeholderQuery.isFetching) {
    return (
      <div className='flex items-center justify-center h-full'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!projectQuery.data) {
    return null;
  }

  const checklist: ChecklistItem[] = (() => {
    return [
      {
        title: t('dashboard.checklist.documents'),
        isChecked: (documentsQuery.data?.length ?? 0) > 0,
        href: '/documents/create'
      }
    ];
  })();

  const userName = `${projectQuery.data?.name}`;

  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <H2>{t('dashboard.welcome', { name: userName })} !</H2>
      </div>

      {checklist.filter((item) => !item.isChecked).length === 0 && (
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <NumberCard
            title={t('document.title')}
            number={documentsQuery.data?.length ?? 0}
            icon={<DocumentIcon className='w-6 h-6 text-primary' />}
            href='/documents'
          />
        </div>
      )}

      {checklist.filter((item) => !item.isChecked).length > 0 && (
        <ChecklistCard list={checklist} title={t('dashboard.checklist.title')} />
      )}
    </div>
  );
};
