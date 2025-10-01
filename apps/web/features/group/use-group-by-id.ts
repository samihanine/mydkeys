'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useGroupById(id?: string) {
  return useQuery(orpc.group.getById.queryOptions({ input: { id: id! }, enabled: !!id }));
}
