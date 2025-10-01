'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useSpecificationsByCurrentProject() {
  return useQuery(orpc.specification.getByCurrentProject.queryOptions());
}
