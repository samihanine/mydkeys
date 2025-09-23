'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateDomain() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.domain.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.domain.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
