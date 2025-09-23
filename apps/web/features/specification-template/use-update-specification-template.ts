'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateSpecificationTemplate() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.specificationTemplate.update.mutationOptions({
      onSuccess: (values) => {
        queryClient.invalidateQueries(orpc.specificationTemplate.getById.queryOptions({ input: { id: values.id } }));
        queryClient.invalidateQueries(orpc.specificationTemplate.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
