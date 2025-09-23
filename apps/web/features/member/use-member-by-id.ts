'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useMemberById(id: string | undefined) {
  return useQuery({
    ...orpc.member.getById.queryOptions({ input: { id: id ?? '' }, enabled: !!id }),
    enabled: !!id
  });
}
