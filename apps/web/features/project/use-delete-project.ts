'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    orpc.project.destroy.mutationOptions({
      onSuccess: () => {
        toast.success('Projet supprimé avec succès');
        queryClient.invalidateQueries(orpc.project.getAll.queryOptions());
        router.push('/projects');
      },
      onError: (error) => {
        toast.error(`Erreur lors de la suppression: ${error.message}`);
      }
    })
  );
}
