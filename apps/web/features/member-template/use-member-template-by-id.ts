'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useMemberTemplateById(id: string) {
  return useQuery(orpc.memberTemplate.getById.queryOptions({ input: { id }, enabled: !!id }));
}
