'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateStakeholder() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.stakeholder.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(orpc.stakeholder.getAll.queryOptions());
        toast.success('Membre mis à jour avec succès');
      },
      onError: (error: any) => {
        toast.error(error.message);
      }
    })
  );
}
