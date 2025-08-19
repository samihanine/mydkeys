'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.document.destroy.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.document.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
};
