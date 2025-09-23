'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useSpecificationById(id: string) {
  return useQuery(orpc.specification.getById.queryOptions({ input: { id } }));
}
