'use client';

import { GroupForm } from './group-form';
import { useCreateGroup } from './use-create-group';
import { useI18n } from '@/locales/client';
import { Card } from '@repo/ui/components/card';
import { H3 } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const CreateGroupPage = () => {
  const t = useI18n();
  const createMutation = useCreateGroup();
  const router = useRouter();

  return (
    <>
      <H3 className='mb-5'>{t('group.createTitle')}</H3>
      <Card className='p-6 shadow-none'>
        <GroupForm
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values);
            router.push('/admin/groups');
          }}
        />
      </Card>
    </>
  );
};
