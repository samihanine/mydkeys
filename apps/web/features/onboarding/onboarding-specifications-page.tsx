'use client';

import { SpecificationsForm } from '../specification/specifications-form';
import { useSpecificationsByCurrentProject } from '../specification/use-specifications-by-current-project';
import { useUpsertSpecification } from '../specification/use-upsert-specification-page';
import { Card, CardContent } from '@repo/ui/components/card';
import { useRouter } from 'next/navigation';

export const OnboardingSpecificationsPage = () => {
  const upsertMutation = useUpsertSpecification();
  const router = useRouter();
  const specificationsQuery = useSpecificationsByCurrentProject();

  return (
    <Card>
      <CardContent>
        <SpecificationsForm
          specifications={specificationsQuery.data}
          onSubmit={async (values) => {
            await upsertMutation.mutateAsync(values);
            router.push('/onboarding/invitations');
          }}
          onCancel={() => router.back()}
        />
      </CardContent>
    </Card>
  );
};
