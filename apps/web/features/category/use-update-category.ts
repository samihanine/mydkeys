'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.category.update.mutationOptions({
      onSuccess: (values) => {
        queryClient.invalidateQueries(orpc.category.getById.queryOptions({ input: { id: values.id } }));
        queryClient.invalidateQueries(orpc.category.getByCurrentProject.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
