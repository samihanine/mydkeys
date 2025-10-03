'use client';

import { usePermissionOptions } from '../assignment/use-permission-options';
import { useDocumentTemplates } from '../document-template/use-document-templates';
import { useGroupTemplates } from '../group-template/use-group-templates';
import { UpdateAssignmentTemplateModal } from './update-assignment-template-modal';
import { useAssignmentTemplates } from './use-assignment-templates';
import { useDeleteAssignmentTemplate } from './use-delete-assignment-template';
import { useI18n } from '@/locales/client';
import { PencilIcon } from '@heroicons/react/24/solid';
import type { AssignmentTemplate } from '@repo/database/schema';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { DataTable } from '@repo/ui/components/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { TrashIcon } from 'lucide-react';
import { useState } from 'react';

export const AssignmentTemplateTable = ({
  groupTemplateId,
  documentTemplateId,
  domainId
}: {
  groupTemplateId?: string;
  documentTemplateId?: string;
  domainId: string;
}) => {
  const t = useI18n();
  const deleteAssignmentTemplateMutation = useDeleteAssignmentTemplate();
  const assignmentTemplatesQuery = useAssignmentTemplates();
  const groupTemplatesQuery = useGroupTemplates();
  const documentTemplatesQuery = useDocumentTemplates();
  const permissionOptions = usePermissionOptions();
  const columns: ColumnDef<AssignmentTemplate>[] = [
    {
      header: t('assignment.list.columns.groupTemplateId'),
      accessorKey: 'groupTemplateId',
      id: 'groupTemplateId',
      cell: ({ row }) => {
        const group = groupTemplatesQuery.data?.find((group) => group.id === row.original.groupTemplateId);
        return <p className='text-sm'>{group?.name}</p>;
      }
    },
    {
      header: t('assignment.list.columns.documentTemplateId'),
      accessorKey: 'documentTemplateId',
      id: 'documentTemplateId',
      cell: ({ row }) => {
        const documentTemplate = documentTemplatesQuery.data?.find(
          (document) => document.id === row.original.documentTemplateId
        );
        return <p className='text-sm'>{documentTemplate?.name}</p>;
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

            <UpdateAssignmentTemplateModal
              assignmentTemplateId={row.original.id!}
              isOpen={isUpdateAssignmentModalOpen}
              onOpenChange={setIsUpdateAssignmentModalOpen}
              groupTemplateId={groupTemplateId}
              documentTemplateId={documentTemplateId}
              domainId={domainId}
            />

            <Button
              variant='outline'
              size='sm'
              disabled={!row.original.id}
              onClick={async () => {
                const confirmed = confirm(t('assignment.list.confirmDelete'));
                if (confirmed) {
                  deleteAssignmentTemplateMutation.mutate({ id: row.original.id });
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
          if (column.id === 'groupTemplateId' && groupTemplateId) return false;
          if (column.id === 'documentTemplateId' && documentTemplateId) return false;
          return true;
        })}
        data={
          assignmentTemplatesQuery.data
            ?.filter((assignmentTemplate) => {
              if (groupTemplateId && assignmentTemplate.groupTemplateId !== groupTemplateId) return false;
              if (documentTemplateId && assignmentTemplate.documentTemplateId !== documentTemplateId) return false;
              return true;
            })
            .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()) || []
        }
        isLoading={assignmentTemplatesQuery.isFetching}
        filters={[]}
        disablePagination
      />
    </>
  );
};
