'use client';

import { orpc } from '@/lib/orpc';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateProject() {
  return useMutation(
    orpc.project.create.mutationOptions({
      onSuccess: () => {
        toast.success('Projet créé avec succès');
      },
      onError: (error) => {
        toast.error(`Erreur lors de la création: ${error.message}`);
      }
    })
  );
}
