'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateSpecification() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.specification.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.specification.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
