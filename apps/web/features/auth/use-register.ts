import { authClient } from '@/lib/auth-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useRegister = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ email, password, name }: { email: string; password: string; name: string }) => {
      const result = await authClient.signUp.email({
        email,
        password,
        name
      });

      await queryClient.refetchQueries({ queryKey: ['currentUser'] });

      router.push(`/verify-email?email=${email}`);

      return result;
    }
  });
};
