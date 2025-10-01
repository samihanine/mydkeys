'use client';

import { GroupTemplateForm } from './group-template-form';
import { useGroupTemplateById } from './use-group-template-by-id';
import { useUpdateGroupTemplate } from './use-update-group-template';
import { Card } from '@repo/ui/components/card';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H3, P } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const UpdateGroupTemplatePage = ({ id }: { id: string }) => {
  const mutation = useUpdateGroupTemplate();
  const query = useGroupTemplateById(id);
  const router = useRouter();

  if (query.isFetching) {
    return (
      <div className='flex h-full items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  const item = query.data;

  if (!item) {
    return (
      <div className='flex h-full items-center justify-center'>
        <P>Template not found</P>
      </div>
    );
  }

  return (
    <>
      <H3 className='mb-5'>Update {item.name}</H3>
      <Card className='p-6 shadow-none'>
        <GroupTemplateForm
          item={item}
          onSubmit={async (values) => {
            await mutation.mutateAsync({ ...values, id });
            router.push('/admin/group-templates');
          }}
        />
      </Card>
    </>
  );
};
