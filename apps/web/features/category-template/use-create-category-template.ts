'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateCategoryTemplate() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.categoryTemplate.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.categoryTemplate.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
