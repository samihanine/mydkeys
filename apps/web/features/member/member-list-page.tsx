'use client';

import { useCurrentUser } from '../auth/use-current-user';
import { useGroupMembersByCurrentProject } from '../group-member/use-group-members-by-current-project';
import { GroupBadge } from '../group/group-badge';
import { useGroupsByCurrentProject } from '../group/use-groups-by-current-project';
import { MemberAvatar } from './member-avatar';
import { useDeleteMember } from './use-delete-member';
import { useMembersByCurrentProject } from './use-members-by-current-project';
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
  const membersQuery = useMembersByCurrentProject();
  const deleteMemberMutation = useDeleteMember();
  const currentUserQuery = useCurrentUser();
  const groupMembersQuery = useGroupMembersByCurrentProject();
  const groupsQuery = useGroupsByCurrentProject();

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
      header: t('member.list.columns.user'),
      accessorKey: 'userId',
      cell: ({ row }) => {
        const userId = row.original.userId;

        if (!userId) {
          return (
            <Badge size='sm' variant='outline'>
              {t('member.list.pendingInvitation')}
            </Badge>
          );
        }
        return (
          <Badge size='sm' variant='secondary'>
            {t('member.list.active')}
          </Badge>
        );
      }
    },
    {
      header: 'Rôles',
      accessorKey: 'groups',
      cell: ({ row }) => {
        if (row.original.isAdministrator) {
          return (
            <Badge size='sm' variant='outline' className='bg-primary text-primary-foreground'>
              Administrateur
            </Badge>
          );
        }
        const groupMembers = groupMembersQuery.data?.filter((groupMember) => groupMember.memberId === row.original.id);
        const groups = groupsQuery.data?.filter((group) =>
          groupMembers?.some((groupMember) => groupMember.groupId === group.id)
        );
        return <div className='flex gap-2'>{groups?.map((group) => <GroupBadge group={group} />)}</div>;
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
        isLoading={membersQuery.isFetching}
        filters={[
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
