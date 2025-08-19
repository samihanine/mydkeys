'use client';

import { useDocuments } from '../document/use-documents';
import { useInterventions } from '../intervention/use-documents';
import { useCurrentMember } from '../stakeholder/use-current-stakeholder';
import { ChecklistCard, ChecklistItem } from './checklist-card';
import { NumberCard } from './number-card';
import { ProfileResume } from './profile-resume';
import { useDisorders } from '@/features/disorder/use-disorders';
import { useGoals } from '@/features/goal/use-goals';
import { useCurrentProfile } from '@/features/profile/use-current-profile';
import { useI18n } from '@/locales/client';
import { ClipboardDocumentListIcon, DocumentIcon, FlagIcon, PuzzlePieceIcon } from '@heroicons/react/24/solid';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H2 } from '@repo/ui/components/typography';

export const DashboardPage = () => {
  const t = useI18n();
  const profileQuery = useCurrentProfile();
  const documentsQuery = useDocuments();
  const currentMemberQuery = useCurrentMember();
  const interventionsQuery = useInterventions();
  const disordersQuery = useDisorders();
  const goalsQuery = useGoals();

  if (
    profileQuery.isFetching ||
    documentsQuery.isFetching ||
    currentMemberQuery.isFetching ||
    interventionsQuery.isFetching ||
    disordersQuery.isFetching ||
    goalsQuery.isFetching
  ) {
    return (
      <div className='flex items-center justify-center h-full'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!profileQuery.data) {
    return null;
  }

  const checklist: ChecklistItem[] = (() => {
    return [
      {
        title: t('dashboard.checklist.documents'),
        isChecked: (documentsQuery.data?.length ?? 0) > 0,
        href: '/documents/create'
      },
      {
        title: t('dashboard.checklist.interventions'),
        isChecked: (interventionsQuery.data?.length ?? 0) > 0,
        href: '/interventions/create'
      },
      {
        title: t('dashboard.checklist.disorders'),
        isChecked: (disordersQuery.data?.length ?? 0) > 0,
        href: '/disorders/create'
      },
      {
        title: t('dashboard.checklist.goals'),
        isChecked: (goalsQuery.data?.length ?? 0) > 0,
        href: '/goals/create'
      }
    ];
  })();

  const userName = `${profileQuery.data?.firstName} ${profileQuery.data?.lastName}`;

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
          <NumberCard
            title={t('intervention.title')}
            number={interventionsQuery.data?.length ?? 0}
            icon={<ClipboardDocumentListIcon className='w-6 h-6 text-primary' />}
            href='/interventions'
          />
          <NumberCard
            title={t('disorder.title')}
            number={disordersQuery.data?.length ?? 0}
            icon={<PuzzlePieceIcon className='w-6 h-6 text-primary' />}
            href='/disorders'
          />
          <NumberCard
            title={t('goal.title')}
            number={goalsQuery.data?.length ?? 0}
            icon={<FlagIcon className='w-6 h-6 text-primary' />}
            href='/goals'
          />
        </div>
      )}

      {checklist.filter((item) => !item.isChecked).length > 0 && (
        <ChecklistCard list={checklist} title={t('dashboard.checklist.title')} />
      )}

      <ProfileResume />
    </div>
  );
};
