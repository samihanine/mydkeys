'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useSpecifications() {
  return useQuery(orpc.specification.getAll.queryOptions());
}
