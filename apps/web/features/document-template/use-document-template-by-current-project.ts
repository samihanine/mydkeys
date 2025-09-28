'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useDocumentTemplatesByCurrentProject() {
  return useQuery(orpc.documentTemplate.getByCurrentProject.queryOptions());
}
