'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateCategoryTemplate() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.categoryTemplate.update.mutationOptions({
      onSuccess: (values) => {
        queryClient.invalidateQueries(orpc.categoryTemplate.getById.queryOptions({ input: { id: values.id } }));
        queryClient.invalidateQueries(orpc.categoryTemplate.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
