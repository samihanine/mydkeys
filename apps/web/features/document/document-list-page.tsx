'use client';

import { useAssignmentsByCurrentProject } from '../assignment/use-assignments-by-current-project';
import { useCurrentMember } from '../member/use-current-member';
import { DocumentList } from './document-list';
import { useDocumentsByCurrentProject } from '@/features/document/use-documents-by-current-project';
import { useI18n } from '@/locales/client';
import { Card, CardFooter } from '@repo/ui/components/card';
import { CardContent } from '@repo/ui/components/card';
import { ProgressRing } from '@repo/ui/components/progress-ring';
import { H3 } from '@repo/ui/components/typography';
import { useMemo } from 'react';

export function DocumentListPage({ groupId }: { groupId?: string }) {
  const documentsQuery = useDocumentsByCurrentProject();
  const data = documentsQuery.data || [];
  const assignmentsQuery = useAssignmentsByCurrentProject();
  const assignments = assignmentsQuery.data?.filter((assignment) => assignment.groupId === groupId) || [];

  const t = useI18n();

  const documents = useMemo(
    () =>
      groupId
        ? data.filter((document) => assignments.some((assignment) => assignment.documentId === document.id))
        : data,
    [data, assignments, groupId]
  );

  return (
    <>
      <div className='flex justify-center flex-col md:flex-row md:justify-between items-start flex-wrap gap-4 mb-8'>
        <div>
          <H3 className='mb-4'>{t('document.title')}</H3>

          <p className='text-muted-foreground'>{t('document.subtitle')}</p>
        </div>

        <Card className='w-full md:max-w-sm mb-4'>
          <CardContent className='flex flex-col md:flex-row items-center gap-2 justify-evenly'>
            <ProgressRing
              percentage={
                (documents.filter((document) => document.status === 'APPROVED').length / documents.length) * 100
              }
              size='xl'
            />

            <div className='flex flex-col gap-2 text-center'>
              <span className='text-lg font-bold'>
                {documents.filter((document) => document.status === 'APPROVED').length} / {documents.length}
              </span>

              <span className='text-sm text-muted-foreground'>{t('document.documentsValidated')}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <DocumentList documents={documents} isLoading={documentsQuery.isFetching || assignmentsQuery.isFetching} />;
    </>
  );
}
