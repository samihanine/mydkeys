'use client';

import { useCurrentStakeholder } from '../stakeholder/use-current-stakeholder';
import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export const useDocuments = () => {
  const currentStakeholderQuery = useCurrentStakeholder();
  return useQuery(
    orpc.document.getAll.queryOptions({
      enabled: !!currentStakeholderQuery.data
    })
  );
};
