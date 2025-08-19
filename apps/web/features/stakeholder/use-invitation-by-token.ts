'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useInvitationByToken(token: string) {
  return useQuery(orpc.invitation.getByToken.queryOptions({ input: { token } }));
}
