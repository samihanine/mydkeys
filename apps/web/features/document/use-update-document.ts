'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateDocument() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.document.update.mutationOptions({
      onSuccess: (values) => {
        if (values?.id) {
          queryClient.invalidateQueries(orpc.document.getById.queryOptions({ input: { id: values?.id } }));
        }
        queryClient.invalidateQueries(orpc.document.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
