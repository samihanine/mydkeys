'use client';

import { authClient } from '@/lib/auth-client';
import { useQuery } from '@tanstack/react-query';
import type { User } from '@repo/database/schema';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const result = await authClient.getSession() 
      return (result.data?.user ?? null) as User
    }
  });
}
