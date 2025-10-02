'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useDeleteAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.assignment.destroy.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.assignment.getByCurrentProject.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
};
