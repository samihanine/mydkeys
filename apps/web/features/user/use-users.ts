'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useUsers() {
  return useQuery(orpc.user.getAll.queryOptions());
}
