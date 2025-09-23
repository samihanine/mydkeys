'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateMember() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.member.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.member.getAll.queryOptions());
      }
    })
  );
}
