'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useMemberTemplates() {
  return useQuery(orpc.memberTemplate.getAll.queryOptions());
}
