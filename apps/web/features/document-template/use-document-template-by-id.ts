'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useDocumentTemplateById(id: string | undefined) {
  return useQuery(orpc.documentTemplate.getById.queryOptions({ input: { id: id! }, enabled: !!id }));
}
