'use client';

import { useCurrentStakeholder } from './use-current-stakeholder';
import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useStakeholders() {
  const currentStakeholderQuery = useCurrentStakeholder();
  return useQuery(
    orpc.stakeholder.getAll.queryOptions({
      enabled: !!currentStakeholderQuery.data
    })
  );
}
