'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useGroupTemplateById(id: string | undefined) {
  return useQuery(orpc.groupTemplate.getById.queryOptions({ input: { id: id! }, enabled: !!id }));
}
