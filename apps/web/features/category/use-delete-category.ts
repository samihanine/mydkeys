'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.category.destroy.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.category.getByCurrentProject.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
