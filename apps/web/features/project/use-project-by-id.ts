'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useProjectById(projectId?: string) {
  return useQuery({
    ...orpc.project.getById.queryOptions({
      input: { id: projectId || '' }
    }),
    enabled: !!projectId
  });
}
