'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useCurrentStakeholder() {
  return useQuery(orpc.stakeholder.getCurrentStakeholder.queryOptions());
}
