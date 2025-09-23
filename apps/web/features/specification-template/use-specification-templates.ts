'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useSpecificationTemplates() {
  return useQuery(orpc.specificationTemplate.getAll.queryOptions());
}
