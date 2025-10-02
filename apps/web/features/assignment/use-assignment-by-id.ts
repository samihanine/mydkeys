'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useAssignmentById(id?: string) {
  return useQuery(orpc.assignment.getById.queryOptions({ input: { id: id! }, enabled: !!id }));
}
