'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpsertGroupMembers() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.groupMember.upsert.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.groupMember.getByCurrentProject.queryOptions());
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  );
}
