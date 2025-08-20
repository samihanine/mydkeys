'use client';

import { StakeholderForm } from './stakeholder-form';
import { useCreateStakeholder } from './use-create-stakeholder';
import { useI18n } from '@/locales/client';
import { Card } from '@repo/ui/components/card';
import { H3 } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const CreateStakeholderPage = () => {
  const t = useI18n();
  const createStakeholder = useCreateStakeholder();
  const router = useRouter();

  return (
    <>
      <H3 className='mb-5'>{t('stakeholder.createTitle')}</H3>
      <Card className='p-6 shadow-none'>
        <StakeholderForm
          onSubmit={async (values) => {
            await createStakeholder.mutateAsync(values);
            router.push('/stakeholders');
          }}
        />
      </Card>
    </>
  );
};
