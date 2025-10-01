'use client';

import { CategoryForm } from './category-form';
import { useCategoryById } from './use-category-by-id';
import { useUpdateCategory } from './use-update-category';
import { Card } from '@repo/ui/components/card';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H3 } from '@repo/ui/components/typography';
import { notFound, useRouter } from 'next/navigation';

export const UpdateCategoryPage = ({ id }: { id: string }) => {
  const mutation = useUpdateCategory();
  const query = useCategoryById(id);
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
    return notFound();
  }

  return (
    <>
      <H3 className='mb-5'>Update {item.name}</H3>
      <Card className='p-6 shadow-none'>
        <CategoryForm
          item={item}
          onSubmit={async (values) => {
            await mutation.mutateAsync({ ...values, id });
            router.push('/categories');
          }}
        />
      </Card>
    </>
  );
};
