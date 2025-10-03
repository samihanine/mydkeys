'use client';

import { useAssignmentTemplates } from '../assignment-template/use-assignment-templates';
import { DomainBadge } from '../domain/domain-badge';
import { useDomains } from '../domain/use-domains';
import { useDeleteDocumentTemplate } from './use-delete-document-template';
import { useDocumentTemplates } from './use-document-templates';
import { useI18n } from '@/locales/client';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import type { DocumentTemplate } from '@repo/database/schema';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { DataTable } from '@repo/ui/components/data-table';
import { H3 } from '@repo/ui/components/typography';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import Link from 'next/link';

export const DocumentTemplateListPage = () => {
  const t = useI18n();
  const query = useDocumentTemplates();
  const destroy = useDeleteDocumentTemplate();
  const domainsQuery = useDomains();
  const assignmentTemplatesQuery = useAssignmentTemplates();

  const columns: ColumnDef<DocumentTemplate>[] = [
    { header: 'Name', accessorKey: 'name' },
    {
      header: 'Domain',
      accessorKey: 'domainId',
      cell: ({ row }) => {
        const domain = domainsQuery.data?.find((domain) => domain.id === row.original.domainId);
        if (!domain) return <span></span>;
        return <DomainBadge domain={domain} />;
      }
    },
    {
      header: 'Rôles',
      accessorKey: 'assignmentTemplates',
      cell: ({ row }) => {
        const count =
          assignmentTemplatesQuery.data?.filter(
            (assignmentTemplate) => assignmentTemplate.documentTemplateId === row.original.id
          ).length || 0;

        return (
          <span>
            <Badge size='sm' variant={count < 1 ? 'outline' : 'default'}>
              {count} {t('common.groups').toLowerCase()}
            </Badge>
          </span>
        );
      }
    },
    {
      header: 'Created',
      accessorKey: 'createdAt',
      cell: ({ row }) => {
        if (!row.original.createdAt) return <span>-</span>;
        return <span>{format(new Date(row.original.createdAt), 'dd/MM/yyyy')}</span>;
      }
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cell: ({ row }) => (
        <div className='flex gap-2'>
          <Link href={`/admin/document-templates/${row.original.id || ''}`}>
            <Button variant='secondary' size='sm' disabled={!row.original.id}>
              <PencilIcon className='h-4 w-4' />
              <span className='hidden md:block'>Edit</span>
            </Button>
          </Link>
          <Button
            variant='outline'
            size='sm'
            disabled={!row.original.id}
            onClick={async () => {
              const confirmed = await confirm('Supprimer ce template ?');
              if (confirmed && row.original.id) {
                destroy.mutate({ id: row.original.id });
              }
            }}
          >
            <TrashIcon className='h-4 w-4 text-secondary' />
            <span className='hidden md:block'>Delete</span>
          </Button>
        </div>
      )
    }
  ];

  return (
    <>
      <div className='flex justify-center flex-col md:flex-row md:justify-between items-center flex-wrap gap-4 mb-8'>
        <H3>Document templates</H3>

        <Link href='/admin/document-templates/create'>
          <Button variant='default'>
            <PlusIcon className='h-4 w-4' />
            Add template
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={
          query.data?.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()) ||
          []
        }
        isLoading={query.isFetching}
        filters={[
          { key: 'name', type: 'text', label: 'Name' },
          { key: 'createdAt', type: 'date', label: 'Created' }
        ]}
      />
    </>
  );
};
