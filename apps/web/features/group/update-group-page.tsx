'use client';

import { AssignmentTable } from '../assignment/assignment-table';
import { CreateAssignmentModal } from '../assignment/create-assignment-modal';
import { GroupForm } from './group-form';
import { useGroupById } from './use-group-by-id';
import { useUpdateGroup } from './use-update-group';
import { useI18n } from '@/locales/client';
import { Button } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H3, P } from '@repo/ui/components/typography';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const UpdateGroupPage = ({ groupId }: { groupId: string }) => {
  const t = useI18n();
  const updateMutation = useUpdateGroup();
  const groupQuery = useGroupById(groupId);
  const router = useRouter();
  const [isCreateAssignmentModalOpen, setIsCreateAssignmentModalOpen] = useState(false);

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
      <Card className='p-6'>
        <GroupForm
          group={item}
          onSubmit={async (values) => {
            await updateMutation.mutateAsync({ ...values, id: groupId });
            router.push(`/groups/${groupId}`);
          }}
        />
      </Card>

      <div className='mt-10'>
        <div className='flex justify-between items-center'>
          <H3>{t('assignment.list.title')}</H3>
          <Button variant='secondary' size='sm' onClick={() => setIsCreateAssignmentModalOpen(true)}>
            <PlusIcon className='h-4 w-4' />
            {t('assignment.list.add')}
          </Button>
        </div>
        <AssignmentTable groupId={groupId} />
      </div>
      <CreateAssignmentModal
        groupId={groupId}
        isOpen={isCreateAssignmentModalOpen}
        onOpenChange={setIsCreateAssignmentModalOpen}
      />
    </>
  );
};
