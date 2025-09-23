'use client';

import { useCurrentMember } from '../member/use-current-member';
import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export const useDocuments = () => {
  const currentMemberQuery = useCurrentMember();
  return useQuery(
    orpc.document.getAll.queryOptions({
      enabled: !!currentMemberQuery.data
    })
  );
};
