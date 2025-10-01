'use client';

import { GroupTemplateForm } from './group-template-form';
import { useCreateGroupTemplate } from './use-create-group-template';
import { Card } from '@repo/ui/components/card';
import { H3 } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const CreateGroupTemplatePage = () => {
  const mutation = useCreateGroupTemplate();
  const router = useRouter();

  return (
    <>
      <H3 className='mb-5'>Create group template</H3>
      <Card className='p-6 shadow-none'>
        <GroupTemplateForm
          onSubmit={async (values) => {
            await mutation.mutateAsync(values);
            router.push('/admin/group-templates');
          }}
        />
      </Card>
    </>
  );
};
