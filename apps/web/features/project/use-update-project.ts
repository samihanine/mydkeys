'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.project.update.mutationOptions({
      onSuccess: (values) => {
        queryClient.invalidateQueries(orpc.project.getByCurrentUser.queryOptions());
        queryClient.invalidateQueries(orpc.project.getById.queryOptions({ input: { id: values.id } }));
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
