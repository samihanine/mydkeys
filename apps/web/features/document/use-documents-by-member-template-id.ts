'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export const useDocumentsByMemberTemplateId = (memberTemplateId?: string) => {
  return useQuery(
    orpc.document.getByMemberTemplateId.queryOptions({
      input: { memberTemplateId: memberTemplateId! },
      enabled: !!memberTemplateId
    })
  );
};
