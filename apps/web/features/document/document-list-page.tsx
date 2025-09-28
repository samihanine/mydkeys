'use client';

import { UploadFileInput } from '../file/upload-file-input';
import { useDocumentTemplates } from '@/features/document-template/use-document-templates';
import { useDocuments } from '@/features/document/use-documents';
import { MemberAvatar } from '@/features/member/member-avatar';
import { useMembers } from '@/features/member/use-members';
import { useI18n } from '@/locales/client';
import type { Document } from '@repo/database/schema';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { DataTable } from '@repo/ui/components/data-table';
import { ProgressRing } from '@repo/ui/components/progress-ring';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { UploadIcon } from 'lucide-react';
import { useRef } from 'react';

export const DocumentListPage = () => {
  const t = useI18n();
  const documentsQuery = useDocuments();
  const membersQuery = useMembers();
  const documentTemplatesQuery = useDocumentTemplates();
  const inputRef = useRef<HTMLInputElement>(null);

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
      header: t('document.list.columns.deadlineAt'),
      accessorKey: 'deadlineAt',
      cell: ({ row }) => {
        if (!row.original.deadlineAt) {
          return <span>-</span>;
        }
        return <span>{format(new Date(row.original.deadlineAt), 'dd/MM/yyyy')}</span>;
      }
    },
    {
      header: t('document.list.columns.actions'),
      accessorKey: 'actions',
      cell: ({ row }) => {
        return (
          <div className='flex gap-2'>
            <Button
              variant='outline'
              size='sm'
              className='text-primary font-medium'
              onClick={() => inputRef.current?.click()}
            >
              <UploadIcon className='h-4 w-4' />
              {t('document.list.actions.upload')}
            </Button>
            <UploadFileInput ref={inputRef} className='hidden' setId={console.log} />
          </div>
        );
      }
    }
  ];

  return (
    <>
      <ProgressRing percentage={50} size='2xl' />
      <DataTable
        columns={columns}
        data={
          documentsQuery.data?.sort(
            (a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
          ) || []
        }
        isLoading={documentsQuery.isFetching || membersQuery.isFetching}
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
