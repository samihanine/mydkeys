'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateGroup() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.group.update.mutationOptions({
      onSuccess: (values) => {
        if (values?.id) {
          queryClient.invalidateQueries(orpc.group.getById.queryOptions({ input: { id: values?.id } }));
        }
        queryClient.invalidateQueries(orpc.group.getByCurrentProject.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
