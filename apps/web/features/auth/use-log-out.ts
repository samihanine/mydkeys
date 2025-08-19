'use client';

import { authClient } from '@/lib/auth-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useLogOut() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logOutFn = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          document.cookie = 'better-auth.session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

          await queryClient.invalidateQueries();

          router.push('/login');
        },
        onError: (error) => {
          console.error(error);
        }
      }
    });
  };

  return useMutation({
    mutationFn: logOutFn
  });
}
