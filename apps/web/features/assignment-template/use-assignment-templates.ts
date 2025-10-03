'use client';

import { orpc } from '@/lib/orpc';
import { useQuery } from '@tanstack/react-query';

export const useAssignmentTemplates = () => {
  return useQuery(orpc.assignmentTemplate.getAll.queryOptions());
};
