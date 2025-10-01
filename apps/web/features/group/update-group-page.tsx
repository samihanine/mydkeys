'use client';

import { GroupForm } from './group-form';
import { useGroupById } from './use-group-by-id';
import { useUpdateGroup } from './use-update-group';
import { useI18n } from '@/locales/client';
import { Card } from '@repo/ui/components/card';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H3, P } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const UpdateGroupPage = ({ groupId }: { groupId: string }) => {
  const t = useI18n();
  const updateMutation = useUpdateGroup();
  const groupQuery = useGroupById(groupId);
  const router = useRouter();

  if (groupQuery.isFetching) {
    return (
      <div className='flex h-full items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  const item = groupQuery.data;

  if (!item) {
    return (
      <div className='flex h-full items-center justify-center'>
        <P>{t('group.notFound')}</P>
      </div>
    );
  }

  return (
    <>
      <H3 className='mb-5'>
        {t('group.updateTitle')} - {item.name}
      </H3>
      <Card className='p-6 shadow-none'>
        <GroupForm
          group={item}
          onSubmit={async (values) => {
            await updateMutation.mutateAsync({ ...values, id: groupId });
            router.push('/admin/groups');
          }}
        />
      </Card>
    </>
  );
};
