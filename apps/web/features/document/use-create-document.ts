'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateDocument() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.document.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.document.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
