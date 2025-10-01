'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useProjectsByCurrentUser() {
  return useQuery(orpc.project.getByCurrentUser.queryOptions());
}
