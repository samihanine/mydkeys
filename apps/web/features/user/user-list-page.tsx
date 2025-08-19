'use client';

import { UserAvatar } from '../user/user-avatar';
import { useUsers } from './use-users';
import { useI18n } from '@/locales/client';
import type { User } from '@repo/database/schema';
import { Badge } from '@repo/ui/components/badge';
import { DataTable } from '@repo/ui/components/data-table';
import { H3 } from '@repo/ui/components/typography';
import { ColumnDef } from '@tanstack/react-table';

export const UserListPage = () => {
  const t = useI18n();
  const usersQuery = useUsers();

  const columns: ColumnDef<User>[] = [
    {
      header: t('users.columns.avatar'),
      accessorKey: 'image',
      cell: ({ row }) => {
        return (
          <div className='flex items-center gap-2'>
            <UserAvatar user={row.original} />
          </div>
        );
      }
    },
    {
      header: t('users.columns.name'),
      accessorKey: 'name',
      cell: ({ row }) => {
        return <span className='text-sm'>{row.original.name}</span>;
      }
    },
    {
      header: t('users.columns.email'),
      accessorKey: 'email',
      cell: ({ row }) => {
        return <span className='text-sm'>{row.original.email}</span>;
      }
    },
    {
      header: t('users.columns.role'),
      accessorKey: 'role',
      cell: ({ row }) => {
        if (row.original.role === 'ADMIN') {
          return <Badge variant='default'>{t('users.roles.ADMIN')}</Badge>;
        }

        return <Badge variant='outline'>{t('users.roles.USER')}</Badge>;
      }
    },
    {
      header: t('users.columns.createdAt'),
      accessorKey: 'createdAt',
      cell: ({ row }) => {
        return <span className='text-sm'>{new Date(row.original.createdAt).toLocaleDateString()}</span>;
      }
    }
  ];

  return (
    <>
      <div className='flex justify-center flex-col md:flex-row md:justify-between items-center flex-wrap gap-4 mb-8'>
        <H3>{t('users.title')}</H3>
      </div>

      <DataTable
        columns={columns as any}
        data={usersQuery.data || []}
        isLoading={usersQuery.isFetching}
        filters={[
          {
            key: 'name',
            type: 'text',
            label: t('users.filters.name')
          },
          {
            key: 'email',
            type: 'text',
            label: t('users.filters.email')
          },
          {
            key: 'role',
            type: 'select',
            label: t('users.filters.role'),
            options: [
              { value: 'ADMIN', label: t('users.roles.ADMIN') },
              { value: 'user', label: t('users.roles.USER') }
            ]
          },
          {
            key: 'createdAt',
            type: 'date',
            label: t('users.filters.createdAt')
          }
        ]}
      />
    </>
  );
};
