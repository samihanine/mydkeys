'use client';

import { authClient } from '@/lib/auth-client';
import { useMutation } from '@tanstack/react-query';

export function useLoginWithGoogle() {
  return useMutation({
    mutationFn: async () => {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: `${process.env.NEXT_PUBLIC_APP_URL || 'https://app.mydkeys.ca'}/dashboard`
      });
    }
  });
}
