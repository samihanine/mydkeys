'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteGroupTemplate() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.groupTemplate.destroy.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.groupTemplate.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
