'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.project.update.mutationOptions({
      onSuccess: () => {
        toast.success('Profil mis à jour avec succès');
        queryClient.invalidateQueries(orpc.project.getAll.queryOptions());
      },
      onError: (error) => {
        toast.error(`Erreur lors de la mise à jour: ${error.message}`);
      }
    })
  );
}
