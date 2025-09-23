'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateMemberTemplate() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.memberTemplate.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.memberTemplate.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
