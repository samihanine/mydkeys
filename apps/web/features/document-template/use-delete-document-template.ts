'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteDocumentTemplate() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.documentTemplate.destroy.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.documentTemplate.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
