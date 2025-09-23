'use client';

import { CategoryBadge } from '../category/category-badge';
import { useCategories } from '../category/use-categories';
import { useDeleteDocumentTemplate } from './use-delete-document-template';
import { useDocumentTemplates } from './use-document-templates';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import type { DocumentTemplate } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { DataTable } from '@repo/ui/components/data-table';
import { H3 } from '@repo/ui/components/typography';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import Link from 'next/link';

export const DocumentTemplateListPage = () => {
  const query = useDocumentTemplates();
  const destroy = useDeleteDocumentTemplate();
  const categoriesQuery = useCategories();

  const columns: ColumnDef<DocumentTemplate>[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Slug', accessorKey: 'slug' },
    {
      header: 'Category',
      accessorKey: 'categoryId',
      cell: ({ row }) => {
        const category = categoriesQuery.data?.find((category) => category.id === row.original.categoryId);
        if (!category) return <span>-</span>;
        return <CategoryBadge category={category} />;
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
          { key: 'slug', type: 'text', label: 'Slug' },
          { key: 'createdAt', type: 'date', label: 'Created' }
        ]}
      />
    </>
  );
};
