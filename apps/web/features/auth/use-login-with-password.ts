import { authClient } from '@/lib/auth-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useLoginWithPassword = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      try {
        const result = await authClient.signIn.email({
          email,
          password
        });

        await queryClient.refetchQueries({ queryKey: ['currentUser'] });

        router.push('/dashboard');

        return result;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    }
  });
};
