'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useProjects() {
  return useQuery(orpc.project.getAll.queryOptions());
}
