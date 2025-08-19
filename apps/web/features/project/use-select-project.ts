'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSelectProject() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.project.select.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries();
      }
    })
  );
}
