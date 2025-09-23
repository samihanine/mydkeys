'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useDomainById(id: string) {
  return useQuery(orpc.domain.getById.queryOptions({ input: { id }, enabled: !!id }));
}
