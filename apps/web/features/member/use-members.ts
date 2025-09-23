'use client';

import { useCurrentMember } from './use-current-member';
import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useMembers() {
  const currentMemberQuery = useCurrentMember();
  return useQuery(
    orpc.member.getAll.queryOptions({
      enabled: !!currentMemberQuery.data
    })
  );
}
