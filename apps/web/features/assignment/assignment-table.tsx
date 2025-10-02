'use client';

import { useDocumentsByCurrentProject } from '../document/use-documents-by-current-project';
import { useGroupsByCurrentProject } from '../group/use-groups-by-current-project';
import { UpdateAssignmentModal } from './update-assignment-modal';
import { useAssignmentsByCurrentProject } from './use-assignments-by-current-project';
import { useDeleteAssignment } from './use-delete-assignment';
import { usePermissionOptions } from './use-permission-options';
import { useI18n } from '@/locales/client';
import { PencilIcon } from '@heroicons/react/24/solid';
import type { Assignment } from '@repo/database/schema';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { DataTable } from '@repo/ui/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';

export const AssignmentTable = ({ groupId, documentId }: { groupId?: string; documentId?: string }) => {
  const t = useI18n();
  const deleteAssignmentMutation = useDeleteAssignment();
  const assignmentsQuery = useAssignmentsByCurrentProject();
  const groupsQuery = useGroupsByCurrentProject();
  const documentsQuery = useDocumentsByCurrentProject();
  const permissionOptions = usePermissionOptions();
  const columns: ColumnDef<Assignment>[] = [
    {
      header: t('assignment.list.columns.groupId'),
      accessorKey: 'groupId',
      id: 'groupId',
      cell: ({ row }) => {
        const group = groupsQuery.data?.find((group) => group.id === row.original.groupId);
        return <p className='text-sm'>{group?.name}</p>;
      }
    },
    {
      header: t('assignment.list.columns.documentId'),
      accessorKey: 'documentId',
      id: 'documentId',
      cell: ({ row }) => {
        const document = documentsQuery.data?.find((document) => document.id === row.original.documentId);
        return <p className='text-sm'>{document?.name}</p>;
      }
    },
    {
      header: t('assignment.list.columns.permission'),
      accessorKey: 'permission',
      cell: ({ row }) => {
        const permission = permissionOptions.find((permission) => permission.value === row.original.permission);
        return <Badge size='sm'>{permission?.label}</Badge>;
      }
    },
    {
      header: t('assignment.list.columns.actions'),
      accessorKey: 'actions',
      cell: ({ row }) => {
        const [isUpdateAssignmentModalOpen, setIsUpdateAssignmentModalOpen] = useState(false);

        return (
          <div className='flex gap-2'>
            <Button
              variant='secondary'
              size='sm'
              disabled={!row.original.id}
              onClick={() => setIsUpdateAssignmentModalOpen(true)}
            >
              <PencilIcon className='h-4 w-4' />
              <span className='hidden md:block'>{t('assignment.list.actions.edit')}</span>
            </Button>

            <UpdateAssignmentModal
              assignmentId={row.original.id!}
              isOpen={isUpdateAssignmentModalOpen}
              onOpenChange={setIsUpdateAssignmentModalOpen}
              groupId={groupId}
            />

            <Button
              variant='outline'
              size='sm'
              disabled={!row.original.id}
              onClick={async () => {
                const confirmed = confirm(t('assignment.list.confirmDelete'));
                if (confirmed) {
                  deleteAssignmentMutation.mutate({ id: row.original.id });
                }
              }}
            >
              <TrashIcon className='h-4 w-4 text-red-500' />
              <span className='hidden md:block'>{t('assignment.list.actions.delete')}</span>
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <>
      <DataTable
        columns={columns.filter((column) => {
          if (column.id === 'groupId' && groupId) return false;
          if (column.id === 'documentId' && documentId) return false;
          return true;
        })}
        data={
          assignmentsQuery.data
            ?.filter((assignment) => {
              if (groupId && assignment.groupId !== groupId) return false;
              if (documentId && assignment.documentId !== documentId) return false;
              return true;
            })
            .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()) || []
        }
        isLoading={assignmentsQuery.isFetching}
        filters={[]}
        disablePagination
      />
    </>
  );
};
