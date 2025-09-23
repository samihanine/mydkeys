'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteDomain() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.domain.destroy.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.domain.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
