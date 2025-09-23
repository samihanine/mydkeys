'use client';

import { SpecificationTemplateForm } from './specification-template-form';
import { useCreateSpecificationTemplate } from './use-create-specification-template';
import { Card } from '@repo/ui/components/card';
import { H3 } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const CreateSpecificationTemplatePage = () => {
  const mutation = useCreateSpecificationTemplate();
  const router = useRouter();

  return (
    <>
      <H3 className='mb-5'>Create specification template</H3>
      <Card className='p-6 shadow-none'>
        <SpecificationTemplateForm
          onSubmit={async (values) => {
            await mutation.mutateAsync(values);
            router.push('/admin/specification-templates');
          }}
        />
      </Card>
    </>
  );
};
