'use client';

import { useAssignmentTemplates } from '../assignment-template/use-assignment-templates';
import { useGroupTemplates } from '../group-template/use-group-templates';
import { GroupBadge } from '../group/group-badge';
import { useDeleteDocumentTemplate } from './use-delete-document-template';
import { useDocumentTemplates } from './use-document-templates';
import { useI18n } from '@/locales/client';
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import type { DocumentTemplate } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { DataTable } from '@repo/ui/components/data-table';
import { H3 } from '@repo/ui/components/typography';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const DocumentTemplateListPage = () => {
  const t = useI18n();
  const query = useDocumentTemplates();
  const destroy = useDeleteDocumentTemplate();
  const assignmentTemplatesQuery = useAssignmentTemplates();
  const groupTemplatesQuery = useGroupTemplates();

  const columns: ColumnDef<DocumentTemplate>[] = [
    { header: 'Titre', accessorKey: 'name' },
    {
      header: 'Parties prenantes',
      accessorFn: (row) => {
        const assignments = assignmentTemplatesQuery.data?.filter(
          (assignmentTemplate) => assignmentTemplate.documentTemplateId === row.id
        );
        return assignments?.map((assignment) => assignment.groupTemplateId);
      },
      cell: ({ row }) => {
        const assignments = assignmentTemplatesQuery.data?.filter(
          (assignmentTemplate) => assignmentTemplate.documentTemplateId === row.original.id
        );

        const groupTemplates = groupTemplatesQuery.data?.filter((groupTemplate) =>
          assignments?.some((assignment) => assignment.groupTemplateId === groupTemplate.id)
        );

        return (
          <div className='flex gap-2'>
            {groupTemplates?.map((groupTemplate) => (
              <GroupBadge name={groupTemplate.name} hexColor={groupTemplate.hexColor} />
            ))}
          </div>
        );
      }
    },
    {
      header: 'Exemple',
      accessorKey: 'exampleUrl',
      cell: ({ row }) => {
        return (
          <Button
            variant='outline'
            disabled={!row.original.exampleUrl}
            size='sm'
            onClick={() => {
              window.open(process.env.NEXT_PUBLIC_FILE_ENDPOINT + '/' + row.original.exampleUrl, '_blank');
            }}
          >
            <EyeIcon className='h-4 w-4 text-secondary' />
            Voir l'exemple
          </Button>
        );
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
              <span className='hidden md:block'>Modifier</span>
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
            <TrashIcon className='h-4 w-4 text-red-500' />
          </Button>
        </div>
      )
    }
  ];

  return (
    <>
      <div className='flex justify-center flex-col md:flex-row md:justify-between items-center flex-wrap gap-4 mb-8'>
        <H3>Modèles de documents</H3>

        <Link href='/admin/document-templates/create'>
          <Button variant='default'>
            <PlusIcon className='h-4 w-4' />
            Ajouter
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
        filters={[{ key: 'name', type: 'text', label: 'Titre' }]}
      />
    </>
  );
};
