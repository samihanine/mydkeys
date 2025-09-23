'use client';

import { SpecificationsForm } from '../specification/specifications-form';
import { useSpecifications } from '../specification/use-specifications';
import { useUpsertSpecification } from '../specification/use-upsert-specification-page';
import { useRouter } from 'next/navigation';

export const OnboardingSpecificationsPage = () => {
  const query = useSpecifications();
  const upsertMutation = useUpsertSpecification();
  const router = useRouter();

  return (
    <SpecificationsForm
      specifications={query.data}
      onSubmit={async (values) => {
        await upsertMutation.mutateAsync(values);
        router.push('/onboarding/members');
      }}
      onCancel={() => router.back()}
    />
  );
};
