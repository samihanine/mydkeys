'use client';

import { CategoryTemplateForm } from './category-template-form';
import { useCategoryTemplateById } from './use-category-template-by-id';
import { useUpdateCategoryTemplate } from './use-update-category-template';
import { Card } from '@repo/ui/components/card';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H3, P } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const UpdateCategoryTemplatePage = ({ id }: { id: string }) => {
  const mutation = useUpdateCategoryTemplate();
  const query = useCategoryTemplateById(id);
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
        <CategoryTemplateForm
          item={item}
          onSubmit={async (values) => {
            await mutation.mutateAsync({ ...values, id });
            router.push('/admin/category-templates');
          }}
        />
      </Card>
    </>
  );
};
