'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useCategoryById(id: string) {
  return useQuery(orpc.category.getById.queryOptions({ input: { id }, enabled: !!id }));
}
