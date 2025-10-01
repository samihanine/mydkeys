'use client';

import { CategoryForm } from './category-form';
import { useCreateCategory } from './use-create-category';
import { Card } from '@repo/ui/components/card';
import { H3 } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const CreateCategoryPage = () => {
  const mutation = useCreateCategory();
  const router = useRouter();

  return (
    <>
      <H3 className='mb-5'>Create category template</H3>
      <Card className='p-6 shadow-none'>
        <CategoryForm
          onSubmit={async (values) => {
            await mutation.mutateAsync(values);
            router.push('/categories');
          }}
        />
      </Card>
    </>
  );
};
