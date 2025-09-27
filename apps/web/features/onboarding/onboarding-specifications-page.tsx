'use client';

import { SpecificationsForm } from '../specification/specifications-form';
import { useSpecifications } from '../specification/use-specifications';
import { useUpsertSpecification } from '../specification/use-upsert-specification-page';
import { useRouter } from 'next/navigation';

export const OnboardingSpecificationsPage = () => {
  const upsertMutation = useUpsertSpecification();
  const router = useRouter();
  const specificationsQuery = useSpecifications();

  return (
    <SpecificationsForm
      specifications={specificationsQuery.data}
      onSubmit={async (values) => {
        await upsertMutation.mutateAsync(values);
        router.push('/onboarding/members');
      }}
      onCancel={() => router.back()}
    />
  );
};
