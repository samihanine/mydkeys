'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateAssignmentTemplate() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.assignmentTemplate.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.assignmentTemplate.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
