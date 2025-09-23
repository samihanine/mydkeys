'use client';

import { MemberTemplateForm } from './member-template-form';
import { useCreateMemberTemplate } from './use-create-member-template';
import { Card } from '@repo/ui/components/card';
import { H3 } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const CreateMemberTemplatePage = () => {
  const mutation = useCreateMemberTemplate();
  const router = useRouter();

  return (
    <>
      <H3 className='mb-5'>Create member template</H3>
      <Card className='p-6 shadow-none'>
        <MemberTemplateForm
          onSubmit={async (values) => {
            await mutation.mutateAsync(values);
            router.push('/admin/member-templates');
          }}
        />
      </Card>
    </>
  );
};
