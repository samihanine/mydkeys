'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateMemberTemplate() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.memberTemplate.update.mutationOptions({
      onSuccess: (values) => {
        queryClient.invalidateQueries(orpc.memberTemplate.getById.queryOptions({ input: { id: values.id } }));
        queryClient.invalidateQueries(orpc.memberTemplate.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
