'use client';

import { orpc } from '@/lib/orpc';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useAcceptInvitation() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.invitation.accept.mutationOptions({
      onSuccess: () => {
        toast.success('Invitation accepted');
        queryClient.invalidateQueries();
      },
      onError: () => {
        toast.error('Failed to accept invitation');
      }
    })
  );
}
