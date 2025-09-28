'use client';

import { useDeleteDomain } from './use-delete-domain';
import { useDomains } from './use-domains';
import { useI18n } from '@/locales/client';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import type { Domain } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { DataTable } from '@repo/ui/components/data-table';
import { H3 } from '@repo/ui/components/typography';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import Link from 'next/link';

export const DomainListPage = () => {
  const t = useI18n();
  const domainsQuery = useDomains();
  const deleteDomainMutation = useDeleteDomain();

  const columns: ColumnDef<Domain>[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Key', accessorKey: 'domainKey' },
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
          <Link href={`/admin/domains/${row.original.id || ''}`}>
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
              const confirmed = await confirm('Supprimer ce domain ?');
              if (confirmed && row.original.id) {
                deleteDomainMutation.mutate({ id: row.original.id });
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
        <H3>Domains</H3>

        <Link href='/admin/domains/create'>
          <Button variant='default'>
            <PlusIcon className='h-4 w-4' />
            Add domain
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={
          domainsQuery.data?.sort(
            (a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
          ) || []
        }
        isLoading={domainsQuery.isFetching}
        filters={[
          { key: 'name', type: 'text', label: 'Name' },
          { key: 'createdAt', type: 'date', label: 'Created' }
        ]}
      />
    </>
  );
};
