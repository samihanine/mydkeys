'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useAssignmentTemplateById(id?: string) {
  return useQuery(orpc.assignmentTemplate.getById.queryOptions({ input: { id: id! }, enabled: !!id }));
}
