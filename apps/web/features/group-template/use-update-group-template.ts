'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateGroupTemplate() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.groupTemplate.update.mutationOptions({
      onSuccess: (values) => {
        queryClient.invalidateQueries(orpc.groupTemplate.getById.queryOptions({ input: { id: values.id } }));
        queryClient.invalidateQueries(orpc.groupTemplate.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
