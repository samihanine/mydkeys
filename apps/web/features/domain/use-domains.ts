'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useDomains() {
  return useQuery(orpc.domain.getAll.queryOptions());
}
