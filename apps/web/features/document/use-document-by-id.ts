'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useDocumentById(id?: string) {
  return useQuery(orpc.document.getById.queryOptions({ input: { id: id! }, enabled: !!id }));
}
