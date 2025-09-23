'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateDocumentTemplate() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.documentTemplate.update.mutationOptions({
      onSuccess: (values) => {
        queryClient.invalidateQueries(orpc.documentTemplate.getById.queryOptions({ input: { id: values.id } }));
        queryClient.invalidateQueries(orpc.documentTemplate.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
