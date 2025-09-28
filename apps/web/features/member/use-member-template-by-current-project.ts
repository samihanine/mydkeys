import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useMemberTemplatesByCurrentProject() {
  return useQuery(orpc.memberTemplate.getByCurrentProject.queryOptions());
}
