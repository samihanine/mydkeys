'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateSpecification() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.specification.update.mutationOptions({
      onSuccess: (values) => {
        if (values?.id) {
          queryClient.invalidateQueries(orpc.specification.getById.queryOptions({ input: { id: values.id } }));
        }
        queryClient.invalidateQueries(orpc.specification.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
