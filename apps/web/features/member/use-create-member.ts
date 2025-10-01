'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateMember() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.member.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.member.getByCurrentProject.queryOptions());
      }
    })
  );
}
