'use client';

import { StakeholderForm } from './stakeholder-form';
import { useStakeholderById } from './use-stakeholder-by-id';
import { useUpdateStakeholder } from './use-update-stakeholder';
import { useI18n } from '@/locales/client';
import { Card } from '@repo/ui/components/card';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H3 } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const UpdateStakeholderPage = ({ stakeholderId }: { stakeholderId: string }) => {
  const t = useI18n();
  const stakeholderQuery = useStakeholderById(stakeholderId);
  const updateStakeholder = useUpdateStakeholder();
  const router = useRouter();

  if (stakeholderQuery.isLoading) {
    return (
      <div className='flex justify-center py-8'>
        <LoadingSpinner />
      </div>
    );
  }

  if (stakeholderQuery.isError || !stakeholderQuery.data) {
    return (
      <div className='text-center py-8'>
        <p className='text-red-500'>{t('stakeholder.loadingError')}</p>
      </div>
    );
  }

  return (
    <>
      <H3 className='mb-5'>{t('stakeholder.updateTitle')}</H3>
      <Card className='p-6 shadow-none'>
        <StakeholderForm
          stakeholder={stakeholderQuery.data}
          onSubmit={async (values) => {
            await updateStakeholder.mutateAsync({ ...values, id: stakeholderQuery.data.id });
            router.push('/stakeholders');
          }}
        />
      </Card>
    </>
  );
};
