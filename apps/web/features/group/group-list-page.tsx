'use client';

import { useDeleteGroup } from './use-delete-group';
import { useGroupsByCurrentProject } from './use-groups-by-current-project';
import { useI18n } from '@/locales/client';
import { PencilIcon } from '@heroicons/react/24/solid';
import type { Group } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { DataTable } from '@repo/ui/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { TrashIcon } from 'lucide-react';
import Link from 'next/link';

export const GroupListPage = () => {
  const t = useI18n();
  const deleteGroupMutation = useDeleteGroup();
  const groupsQuery = useGroupsByCurrentProject();

  const columns: ColumnDef<Group>[] = [
    {
      header: t('group.list.columns.name'),
      accessorKey: 'name',
      cell: ({ row }) => {
        return <p className='text-sm'>{row.original.name}</p>;
      }
    },
    {
      header: t('group.list.columns.actions'),
      accessorKey: 'actions',
      cell: ({ row }) => {
        return (
          <div className='flex gap-2'>
            <Link href={`/groups/${row.original.id || ''}`}>
              <Button variant='secondary' size='sm' disabled={!row.original.id}>
                <PencilIcon className='h-4 w-4' />
                <span className='hidden md:block'>{t('group.list.actions.edit')}</span>
              </Button>
            </Link>

            <Button
              variant='outline'
              size='sm'
              disabled={!row.original.id}
              onClick={async () => {
                const confirmed = confirm(t('group.list.confirmDelete'));
                if (confirmed) {
                  deleteGroupMutation.mutate({ id: row.original.id });
                }
              }}
            >
              <TrashIcon className='h-4 w-4 text-red-500' />
              <span className='hidden md:block'>{t('group.list.actions.delete')}</span>
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={
          groupsQuery.data?.sort(
            (a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
          ) || []
        }
        isLoading={groupsQuery.isFetching}
        filters={[
          {
            key: 'name',
            type: 'text',
            label: t('group.list.filters.name')
          },
          {
            key: 'createdAt',
            type: 'date',
            label: t('group.list.filters.createdAt')
          }
        ]}
      />
    </>
  );
};
