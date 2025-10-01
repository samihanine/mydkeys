'use client';

import { CategoryTemplateForm } from './category-template-form';
import { useCreateCategoryTemplate } from './use-create-category-template';
import { Card } from '@repo/ui/components/card';
import { H3 } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const CreateCategoryTemplatePage = () => {
  const mutation = useCreateCategoryTemplate();
  const router = useRouter();

  return (
    <>
      <H3 className='mb-5'>Create category template</H3>
      <Card className='p-6 shadow-none'>
        <CategoryTemplateForm
          onSubmit={async (values) => {
            await mutation.mutateAsync(values);
            router.push('/admin/category-templates');
          }}
        />
      </Card>
    </>
  );
};
