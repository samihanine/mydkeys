'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useCategoryTemplates() {
  return useQuery(orpc.categoryTemplate.getAll.queryOptions());
}
