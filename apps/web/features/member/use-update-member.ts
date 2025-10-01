'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateMember() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.member.update.mutationOptions({
      onSuccess: (values) => {
        queryClient.invalidateQueries(orpc.member.getByCurrentProject.queryOptions());
        queryClient.invalidateQueries(orpc.member.getById.queryOptions({ input: { id: values?.id } }));
      },
      onError: (error: any) => {
        toast.error(error.message);
      }
    })
  );
}
