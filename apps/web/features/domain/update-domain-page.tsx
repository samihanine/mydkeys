'use client';

import { DomainForm } from './domain-form';
import { useDomainById } from './use-domain-by-id';
import { useUpdateDomain } from './use-update-domain';
import { Card } from '@repo/ui/components/card';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H3, P } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const UpdateDomainPage = ({ domainId }: { domainId: string }) => {
  const updateMutation = useUpdateDomain();
  const domainQuery = useDomainById(domainId);
  const router = useRouter();

  if (domainQuery.isFetching) {
    return (
      <div className='flex h-full items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  const item = domainQuery.data;

  if (!item) {
    return (
      <div className='flex h-full items-center justify-center'>
        <P>Domain not found</P>
      </div>
    );
  }

  return (
    <>
      <H3 className='mb-5'>Update {item.name}</H3>
      <Card className='p-6 shadow-none'>
        <DomainForm
          domain={item}
          onSubmit={async (values) => {
            await updateMutation.mutateAsync({ ...values, id: domainId });
            router.push('/admin/domains');
          }}
        />
      </Card>
    </>
  );
};
