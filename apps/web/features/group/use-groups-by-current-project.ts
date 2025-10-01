'use client';

import { useCurrentMember } from '../member/use-current-member';
import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export const useGroupsByCurrentProject = () => {
  const currentMemberQuery = useCurrentMember();
  return useQuery(
    orpc.group.getByCurrentProject.queryOptions({
      enabled: !!currentMemberQuery.data
    })
  );
};
