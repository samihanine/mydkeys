'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateAssignment() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.assignment.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.assignment.getByCurrentProject.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
