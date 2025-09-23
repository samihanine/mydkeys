'use client';

import { useDeleteDocument } from './use-delete-document';
import { useDocumentTypeOptions } from './use-document-type-options';
import { useDocuments } from '@/features/document/use-documents';
import { MemberAvatar } from '@/features/member/member-avatar';
import { useMembers } from '@/features/member/use-members';
import { useI18n } from '@/locales/client';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { PlusIcon } from '@heroicons/react/24/solid';
import type { Document } from '@repo/database/schema';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { DataTable } from '@repo/ui/components/data-table';
import { H3 } from '@repo/ui/components/typography';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import Link from 'next/link';

export const DocumentListPage = () => {
  const t = useI18n();
  const documentsQuery = useDocuments();
  const deleteDocumentMutation = useDeleteDocument();
  const typeOptions = useDocumentTypeOptions();
  const membersQuery = useMembers();

  const columns: ColumnDef<Document>[] = [
    {
      header: t('document.list.columns.title'),
      accessorKey: 'title'
    },
    {
      header: t('document.list.columns.type'),
      accessorKey: 'type',
      cell: ({ row }) => {
        const label = typeOptions.find((option) => option.value === row.original.type)?.label;
        return <Badge variant='secondary'>{label}</Badge>;
      }
    },
    {
      header: t('document.list.columns.date'),
      accessorKey: 'timestamp',
      cell: ({ row }) => {
        if (!row.original.timestamp) {
          return <span>-</span>;
        }
        return <span>{format(new Date(row.original.timestamp), 'dd/MM/yyyy')}</span>;
      }
    },
    {
      header: t('document.list.columns.author'),
      accessorKey: 'memberId',
      cell: ({ row }) => {
        const member = membersQuery.data?.find((m) => m.id === row.original.memberId);
        if (!member) {
          return null;
        }
        return (
          <span className='flex items-center gap-2'>
            <MemberAvatar member={member} />
            {member?.firstName} {member?.lastName}
          </span>
        );
      }
    },
    {
      header: t('document.list.columns.createdAt'),
      accessorKey: 'createdAt',
      cell: ({ row }) => {
        if (!row.original.createdAt) {
          return <span>-</span>;
        }
        return <span>{format(new Date(row.original.createdAt), 'dd/MM/yyyy')}</span>;
      }
    },
    {
      header: t('document.list.columns.actions'),
      accessorKey: 'actions',
      cell: ({ row }) => {
        return (
          <div className='flex gap-2'>
            <Link href={`/documents/${row.original.id || ''}`}>
              <Button variant='secondary' size='sm' disabled={!row.original.id}>
                <PencilIcon className='h-4 w-4' />
                <span className='hidden md:block'>{t('document.list.actions.edit')}</span>
              </Button>
            </Link>
            <Button
              variant='outline'
              size='sm'
              disabled={!row.original.id}
              onClick={async () => {
                const confirmed = await confirm(t('document.confirmDelete'));
                if (confirmed) {
                  deleteDocumentMutation.mutate({ id: row.original.id });
                }
              }}
            >
              <TrashIcon className='h-4 w-4 text-secondary' />
              <span className='hidden md:block'>{t('document.list.actions.delete')}</span>
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <>
      <div className='flex justify-center flex-col md:flex-row md:justify-between items-center flex-wrap gap-4 mb-8'>
        <H3>{t('document.title')}</H3>

        <Link href='/documents/create'>
          <Button variant='default'>
            <PlusIcon className='h-4 w-4' />
            {t('document.addButton')}
          </Button>
        </Link>
      </div>

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
            key: 'type',
            type: 'select',
            label: t('document.list.filters.type'),
            options: typeOptions
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
