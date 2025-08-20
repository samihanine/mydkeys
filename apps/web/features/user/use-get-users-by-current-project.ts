'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useCurrentUsersByCurrentProject() {
  return useQuery(orpc.user.getCurrentUsersByCurrentProject.queryOptions());
}
