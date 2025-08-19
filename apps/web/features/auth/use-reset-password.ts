import { authClient } from '@/lib/auth-client';
import { useMutation } from '@tanstack/react-query';

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ newPassword, token }: { newPassword: string; token: string }) => {
      return await authClient.resetPassword({
        newPassword,
        token
      });
    }
  });
};
