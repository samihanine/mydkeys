'use client';

import { useUpdateDocument } from '../document/use-update-document';
import { UploadFileInput } from '../file/upload-file-input';
import { useCurrentMember } from '../member/use-current-member';
import { useDocumentsByMemberTemplateId } from './use-documents-by-member-template-id';
import { useDocumentTemplates } from '@/features/document-template/use-document-templates';
import { useDocuments } from '@/features/document/use-documents';
import { MemberAvatar } from '@/features/member/member-avatar';
import { useMembers } from '@/features/member/use-members';
import { useI18n } from '@/locales/client';
import type { Document } from '@repo/database/schema';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent } from '@repo/ui/components/card';
import { DataTable } from '@repo/ui/components/data-table';
import { ProgressRing } from '@repo/ui/components/progress-ring';
import { H3 } from '@repo/ui/components/typography';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { EyeIcon, UploadIcon } from 'lucide-react';
import { useRef } from 'react';

export const DocumentListPage = (props: { memberTemplateId?: string }) => {
  const t = useI18n();
  const membersQuery = useMembers();
  const documentTemplatesQuery = useDocumentTemplates();
  const documentsByMemberTemplateIdQuery = useDocumentsByMemberTemplateId(props.memberTemplateId);
  const inputRef = useRef<HTMLInputElement>(null);
  const updateDocumentMutation = useUpdateDocument();

  const columns: ColumnDef<Document>[] = [
    {
      header: t('document.list.columns.title'),
      accessorKey: 'title',
      cell: ({ row }) => {
        const label = documentTemplatesQuery.data?.find(
          (option) => option.id === row.original.documentTemplateId
        )?.name;
        return <p className='text-sm'>{label}</p>;
      }
    },
    {
      header: t('document.list.columns.status'),
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status;

        if (status === 'MISSING') {
          return (
            <Badge size='sm' variant='red'>
              {t('document.list.status.missing')}
            </Badge>
          );
        }

        if (status === 'UPLOADED') {
          return (
            <Badge size='sm' variant='secondary'>
              {t('document.list.status.uploaded')}
            </Badge>
          );
        }

        if (status === 'APPROVED') {
          return (
            <Badge size='sm' variant='green'>
              {t('document.list.status.approved')}
            </Badge>
          );
        }

        if (status === 'REJECTED') {
          return (
            <Badge size='sm' variant='red'>
              {t('document.list.status.rejected')}
            </Badge>
          );
        }

        return null;
      }
    },
    {
      header: t('document.list.columns.actions'),
      accessorKey: 'actions',
      cell: ({ row }) => {
        const document = row.original;

        if (document.status === 'APPROVED') {
          return (
            <Button
              variant='outline'
              size='sm'
              className='text-secondary font-medium'
              onClick={() => {
                window.open(process.env.NEXT_PUBLIC_FILE_ENDPOINT + '/' + document.fileId, '_blank');
              }}
            >
              <EyeIcon className='h-4 w-4' />
              {t('document.list.actions.see')}
            </Button>
          );
        }

        return (
          <div className='flex gap-2'>
            <Button
              variant='outline'
              size='sm'
              className='text-primary font-medium'
              onClick={() => inputRef.current?.click()}
              disabled={updateDocumentMutation.isPending}
            >
              <UploadIcon className='h-4 w-4' />
              {t('document.list.actions.upload')}
            </Button>
            <UploadFileInput
              ref={inputRef}
              className='hidden'
              setId={async (fileId) => {
                await updateDocumentMutation.mutateAsync({
                  id: row.original.id,
                  fileId: fileId as string,
                  status: 'APPROVED'
                });
              }}
            />
          </div>
        );
      }
    }
  ];

  const documents = documentsByMemberTemplateIdQuery.data || [];

  return (
    <>
      <div className='flex justify-center flex-col md:flex-row md:justify-between items-start flex-wrap gap-4 mb-8'>
        <div>
          <H3 className='mb-4'>Mes documents</H3>

          <p className='text-muted-foreground'>Vous pouvez télécharger vos documents ici.</p>
        </div>

        <Card className='w-full md:max-w-sm mb-4'>
          <CardContent className='flex flex-col md:flex-row items-center gap-2 justify-evenly'>
            <ProgressRing
              percentage={
                (documents.filter((document) => document.status === 'APPROVED').length / documents.length) * 100
              }
              size='2xl'
            />

            <div className='flex flex-col gap-2 text-center'>
              <span className='text-lg font-bold'>
                {documents.filter((document) => document.status === 'APPROVED').length} / {documents.length}
              </span>

              <span className='text-sm text-muted-foreground'>documents validés</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={
          documents.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()) || []
        }
        isLoading={documentsByMemberTemplateIdQuery.isFetching || membersQuery.isFetching}
        filters={[
          {
            key: 'title',
            type: 'text',
            label: t('document.list.filters.title')
          },
          {
            key: 'createdAt',
            type: 'date',
            label: t('document.list.filters.createdAt')
          }
        ]}
      />
    </>
  );
};
