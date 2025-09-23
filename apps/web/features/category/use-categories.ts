'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useCategories() {
  return useQuery(orpc.category.getAll.queryOptions());
}
