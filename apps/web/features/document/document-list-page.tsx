'use client';

import { UploadFileInput } from '../file/upload-file-input';
import { useDocumentsByCurrentProject } from './use-documents-by-current-project';
import { useUpdateDocument } from './use-update-document';
import { useI18n } from '@/locales/client';
import type { Document } from '@repo/database/schema';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent } from '@repo/ui/components/card';
import { DataTable } from '@repo/ui/components/data-table';
import { ProgressRing } from '@repo/ui/components/progress-ring';
import { H3 } from '@repo/ui/components/typography';
import { ColumnDef } from '@tanstack/react-table';
import { EyeIcon, UploadIcon } from 'lucide-react';
import { useRef } from 'react';

export const DocumentListPage = () => {
  const t = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const updateDocumentMutation = useUpdateDocument();
  const documentsQuery = useDocumentsByCurrentProject();
  const documents = documentsQuery.data || [];

  const columns: ColumnDef<Document>[] = [
    {
      header: t('document.list.columns.name'),
      accessorKey: 'name',
      cell: ({ row }) => {
        return <p className='text-sm'>{row.original.name}</p>;
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
              size='2xl'
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

      <DataTable
        columns={columns}
        data={
          documents.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()) || []
        }
        isLoading={documentsQuery.isFetching}
        filters={[
          {
            key: 'name',
            type: 'text',
            label: t('document.list.filters.name')
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
