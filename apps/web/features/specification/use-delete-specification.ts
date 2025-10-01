'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteSpecification() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.specification.destroy.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.specification.getByCurrentProject.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
