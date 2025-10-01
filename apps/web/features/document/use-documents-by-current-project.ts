'use client';

import { useCurrentMember } from '../member/use-current-member';
import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export const useDocumentsByCurrentProject = () => {
  const currentMemberQuery = useCurrentMember();
  return useQuery(
    orpc.document.getByCurrentProject.queryOptions({
      enabled: !!currentMemberQuery.data
    })
  );
};
