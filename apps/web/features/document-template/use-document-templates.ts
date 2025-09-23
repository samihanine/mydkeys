'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useDocumentTemplates() {
  return useQuery(orpc.documentTemplate.getAll.queryOptions());
}
