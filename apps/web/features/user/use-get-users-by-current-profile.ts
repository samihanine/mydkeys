'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useCurrentUsersByCurrentProfile() {
  return useQuery(orpc.user.getCurrentUsersByCurrentProfile.queryOptions());
}
