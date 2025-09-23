'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateDomain() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.domain.update.mutationOptions({
      onSuccess: (values) => {
        queryClient.invalidateQueries(orpc.domain.getAll.queryOptions());
        queryClient.invalidateQueries(orpc.domain.getById.queryOptions({ input: { id: values.id } }));
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
