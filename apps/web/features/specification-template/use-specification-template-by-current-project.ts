import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export function useSpecificationTemplatesByCurrentProject() {
  return useQuery(orpc.specificationTemplate.getByCurrentProject.queryOptions());
}
