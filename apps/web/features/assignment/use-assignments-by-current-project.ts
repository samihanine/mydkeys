'use client';

import { useCurrentMember } from '../member/use-current-member';
import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export const useAssignmentsByCurrentProject = () => {
  const currentMemberQuery = useCurrentMember();
  return useQuery(
    orpc.assignment.getByCurrentProject.queryOptions({
      enabled: !!currentMemberQuery.data
    })
  );
};
