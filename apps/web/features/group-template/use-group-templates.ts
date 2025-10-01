'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useGroupTemplates() {
  return useQuery(orpc.groupTemplate.getAll.queryOptions());
}
