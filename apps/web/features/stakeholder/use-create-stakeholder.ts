'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateStakeholder() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.stakeholder.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.stakeholder.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
