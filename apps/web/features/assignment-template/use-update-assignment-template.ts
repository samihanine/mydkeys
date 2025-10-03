'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateAssignmentTemplate() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.assignmentTemplate.update.mutationOptions({
      onSuccess: (values) => {
        if (values?.id) {
          queryClient.invalidateQueries(orpc.assignmentTemplate.getById.queryOptions({ input: { id: values?.id } }));
        }
        queryClient.invalidateQueries(orpc.assignmentTemplate.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
