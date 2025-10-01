'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useCurrentProject() {
  return useQuery(orpc.project.getCurrentProject.queryOptions({}));
}
