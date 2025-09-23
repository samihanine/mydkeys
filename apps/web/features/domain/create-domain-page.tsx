'use client';

import { DomainForm } from './domain-form';
import { useCreateDomain } from './use-create-domain';
import { Card } from '@repo/ui/components/card';
import { H3 } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const CreateDomainPage = () => {
  const createMutation = useCreateDomain();
  const router = useRouter();

  return (
    <>
      <H3 className='mb-5'>Create domain</H3>
      <Card className='p-6 shadow-none'>
        <DomainForm
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values);
            router.push('/admin/domains');
          }}
        />
      </Card>
    </>
  );
};
