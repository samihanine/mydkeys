'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateAssignment() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.assignment.update.mutationOptions({
      onSuccess: (values) => {
        if (values?.id) {
          queryClient.invalidateQueries(orpc.assignment.getById.queryOptions({ input: { id: values?.id } }));
        }
        queryClient.invalidateQueries(orpc.assignment.getByCurrentProject.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
