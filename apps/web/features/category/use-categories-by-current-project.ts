'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useCategoriesByCurrentProject() {
  return useQuery(orpc.category.getByCurrentProject.queryOptions());
}
