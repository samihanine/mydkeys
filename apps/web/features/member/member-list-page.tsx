'use client';

import { useCurrentUser } from '../auth/use-current-user';
import { useMemberTemplates } from '../member-template/use-member-templates';
import { useCurrentProject } from '../project/use-current-project';
import { useCurrentUsersByCurrentProject } from '../user/use-get-users-by-current-project';
import { MemberAvatar } from './member-avatar';
import { useDeleteMember } from './use-delete-member';
import { useMembers } from './use-members';
import { useI18n } from '@/locales/client';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import type { Member } from '@repo/database/schema';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { DataTable } from '@repo/ui/components/data-table';
import { H3 } from '@repo/ui/components/typography';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import Link from 'next/link';

export const MemberListPage = () => {
  const t = useI18n();
  const membersQuery = useMembers();
  const deleteMemberMutation = useDeleteMember();
  const currentUsersByCurrentProject = useCurrentUsersByCurrentProject();
  const currentUserQuery = useCurrentUser();
  const memberTemplatesQuery = useMemberTemplates();
  const currentProjectQuery = useCurrentProject();

  const columns: ColumnDef<Member>[] = [
    {
      header: t('member.list.columns.name'),
      accessorKey: 'displayName',
      cell: ({ row }) => {
        return (
          <span className='text-sm flex items-center gap-2'>
            <MemberAvatar member={row.original} /> {row.original.displayName}
          </span>
        );
      }
    },
    {
      header: t('member.list.columns.role'),
      accessorKey: 'memberTemplateId',
      cell: ({ row }) => {
        const memberTemplate = memberTemplatesQuery.data?.find((option) => option.id === row.original.memberTemplateId);

        if (row.original.isAdministrator) {
          return (
            <Badge size='sm' variant='yellow' className='px-2 py-1 text-xs'>
              Admin
            </Badge>
          );
        }

        if (!memberTemplate) {
          return null;
        }

        return (
          <Badge size='sm' className='px-2 py-1 text-xs'>
            {memberTemplate?.name}
          </Badge>
        );
      }
    },
    {
      header: t('member.list.columns.user'),
      accessorKey: 'userId',
      cell: ({ row }) => {
        const userId = row.original.userId;
        const user = currentUsersByCurrentProject.data?.find((u) => u.id === userId);

        if (!user) {
          return (
            <Badge size='sm' variant='outline'>
              {t('member.list.pendingInvitation')}
            </Badge>
          );
        }
        return (
          <Badge size='sm' variant='green'>
            {t('member.list.active')}
          </Badge>
        );
      }
    },
    {
      header: t('member.list.columns.addedOn'),
      accessorKey: 'createdAt',
      cell: ({ row }) => {
        if (!row.original.createdAt) {
          return <span>-</span>;
        }
        return <span>{format(new Date(row.original.createdAt), 'dd/MM/yyyy')}</span>;
      }
    },
    {
      header: t('member.list.columns.actions'),
      accessorKey: 'actions',
      cell: ({ row }) => {
        const isCurrentUser = row.original.userId === currentUserQuery.data?.id;

        return (
          <div className='flex gap-2'>
            <Link href={`/members/${row.original.id || ''}`}>
              <Button variant='secondary' size='sm' disabled={!row.original.id}>
                <PencilIcon className='h-4 w-4' />
                <span className='hidden md:block'>{t('member.list.actions.edit')}</span>
              </Button>
            </Link>

            <Button
              variant='outline'
              size='sm'
              disabled={!row.original.id || isCurrentUser}
              onClick={async () => {
                const confirmed = confirm(t('member.list.confirmDelete'));
                if (confirmed) {
                  deleteMemberMutation.mutate({ id: row.original.id });
                }
              }}
            >
              <TrashIcon className='h-4 w-4 text-red-500' />
              <span className='hidden md:block'>{t('member.list.actions.delete')}</span>
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <>
      <div className='flex justify-center flex-col md:flex-row md:justify-between items-center flex-wrap gap-4 mb-8'>
        <H3>{t('member.title')}</H3>
        <Link href='/members/create'>
          <Button variant='default'>
            <PlusIcon className='h-4 w-4' />
            {t('member.addButton')}
          </Button>
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={
          membersQuery.data?.sort(
            (a: Member, b: Member) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
          ) || []
        }
        isLoading={membersQuery.isFetching || currentUsersByCurrentProject.isFetching}
        filters={[
          {
            key: 'memberTemplateId',
            type: 'select',
            label: t('member.list.filters.role'),
            options: memberTemplatesQuery.data?.map((option) => ({ label: option.name, value: option.id }))
          },
          {
            key: 'createdAt',
            type: 'date',
            label: t('member.list.filters.createdAt')
          }
        ]}
      />
    </>
  );
};
