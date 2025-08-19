'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteStakeholder() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.stakeholder.destroy.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.stakeholder.getAll.queryOptions());
        toast.success('Membre supprimé avec succès');
      },
      onError: (error: any) => {
        toast.error(error.message);
      }
    })
  );
}
