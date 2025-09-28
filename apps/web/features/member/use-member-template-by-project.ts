import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useMemberTemplatesByProject() {
  return useQuery(orpc.memberTemplate.getByCurrentProject.queryOptions());
}
