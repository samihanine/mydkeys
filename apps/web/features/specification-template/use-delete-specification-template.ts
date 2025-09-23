'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteSpecificationTemplate() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.specificationTemplate.destroy.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.specificationTemplate.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
