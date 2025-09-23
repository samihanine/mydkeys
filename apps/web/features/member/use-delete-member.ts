'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteMember() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.member.destroy.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.member.getAll.queryOptions());
      },
      onError: (error: any) => {
        toast.error(error.message);
      }
    })
  );
}
