'use client';

import { useCurrentMember } from './use-current-member';
import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useMembersByCurrentProject() {
  const currentMemberQuery = useCurrentMember();
  return useQuery(
    orpc.member.getByCurrentProject.queryOptions({
      enabled: !!currentMemberQuery.data
    })
  );
}
