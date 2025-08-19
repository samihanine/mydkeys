'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useStakeholderById(id: string | undefined) {
  return useQuery({
    ...orpc.stakeholder.getById.queryOptions({ input: { id: id ?? '' }, enabled: !!id }),
    enabled: !!id
  });
}
