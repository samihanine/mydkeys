'use client';

import { MemberTemplateForm } from './member-template-form';
import { useMemberTemplateById } from './use-member-template-by-id';
import { useUpdateMemberTemplate } from './use-update-member-template';
import { Card } from '@repo/ui/components/card';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H3, P } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const UpdateMemberTemplatePage = ({ id }: { id: string }) => {
  const mutation = useUpdateMemberTemplate();
  const query = useMemberTemplateById(id);
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
        <MemberTemplateForm
          item={item}
          onSubmit={async (values) => {
            await mutation.mutateAsync({ ...values, id });
            router.push('/admin/member-templates');
          }}
        />
      </Card>
    </>
  );
};
