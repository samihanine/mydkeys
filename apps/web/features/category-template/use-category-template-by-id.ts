'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useCategoryTemplateById(id: string | undefined) {
  return useQuery(orpc.categoryTemplate.getById.queryOptions({ input: { id: id! }, enabled: !!id }));
}
