'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.group.destroy.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.group.getByCurrentProject.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
};
