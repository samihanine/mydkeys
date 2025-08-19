import { authClient } from '@/lib/auth-client';
import { useMutation } from '@tanstack/react-query';

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      return await authClient.forgetPassword({
        email,
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`
      });
    }
  });
};
