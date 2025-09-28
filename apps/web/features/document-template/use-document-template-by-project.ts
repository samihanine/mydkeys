'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useDocumentTemplatesByProject() {
  return useQuery(orpc.documentTemplate.getByCurrentProject.queryOptions());
}
