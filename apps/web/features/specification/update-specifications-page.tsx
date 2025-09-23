'use client';

import { SpecificationsForm } from './specifications-form';
import { useSpecifications } from './use-specifications';
import { useUpsertSpecification } from './use-upsert-specification-page';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { useRouter } from 'next/navigation';

export const UpdateSpecificationsPage = () => {
  const query = useSpecifications();
  const upsertMutation = useUpsertSpecification();
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{'Modifier les informations du projet'}</CardTitle>
      </CardHeader>
      <CardContent>
        <SpecificationsForm
          specifications={query.data}
          onSubmit={async (values) => {
            await upsertMutation.mutateAsync(values);
          }}
          onCancel={() => router.back()}
        />
      </CardContent>
    </Card>
  );
};
