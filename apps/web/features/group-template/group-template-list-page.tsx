'use client';

import { useAssignmentTemplates } from '../assignment-template/use-assignment-templates';
import { DomainBadge } from '../domain/domain-badge';
import { useDomains } from '../domain/use-domains';
import { useDeleteGroupTemplate } from './use-delete-group-template';
import { useGroupTemplates } from './use-group-templates';
import { useI18n } from '@/locales/client';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import type { GroupTemplate } from '@repo/database/schema';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { DataTable } from '@repo/ui/components/data-table';
import { H3 } from '@repo/ui/components/typography';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import Link from 'next/link';

export const GroupTemplateListPage = () => {
  const t = useI18n();
  const query = useGroupTemplates();
  const destroy = useDeleteGroupTemplate();
  const domainsQuery = useDomains();
  const assignmentTemplatesQuery = useAssignmentTemplates();
  const columns: ColumnDef<GroupTemplate>[] = [
    {
      header: 'Couleur',
      accessorKey: 'hexColor',
      cell: ({ row }) => {
        return <div className='w-8 h-8 rounded-full border' style={{ backgroundColor: row.original.hexColor }} />;
      }
    },
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
            (assignmentTemplate) => assignmentTemplate.groupTemplateId === row.original.id
          ).length || 0;
        return (
          <Badge size='sm' variant={count < 1 ? 'outline' : 'default'}>
            {count} {t('common.groups').toLowerCase()}
          </Badge>
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
          <Link href={`/admin/group-templates/${row.original.id || ''}`}>
            <Button variant='secondary' size='sm' disabled={!row.original.id}>
              <PencilIcon className='h-4 w-4' />
              <span className='hidden md:block'>{t('common.edit')}</span>
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
            <span className='hidden md:block'>{t('common.delete')}</span>
          </Button>
        </div>
      )
    }
  ];

  return (
    <>
      <div className='flex justify-center flex-col md:flex-row md:justify-between items-center flex-wrap gap-4 mb-8'>
        <H3>{t('common.groups')}</H3>

        <Link href='/admin/group-templates/create'>
          <Button variant='default'>
            <PlusIcon className='h-4 w-4' />
            {t('common.add')}
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
          { key: 'key', type: 'text', label: 'Key' },
          { key: 'type', type: 'text', label: 'Type' },
          { key: 'createdAt', type: 'date', label: 'Created' }
        ]}
      />
    </>
  );
};
