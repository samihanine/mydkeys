'use client';

import { AssignmentTemplateTable } from '../assignment-template/assignment-template-table';
import { CreateAssignmentTemplateModal } from '../assignment-template/create-assignment-template-modal';
import { DocumentTemplateForm } from './document-template-form';
import { useDocumentTemplateById } from './use-document-template-by-id';
import { useUpdateDocumentTemplate } from './use-update-document-template';
import { useI18n } from '@/locales/client';
import { Button } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H3, P } from '@repo/ui/components/typography';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const UpdateDocumentTemplatePage = ({ id }: { id: string }) => {
  const mutation = useUpdateDocumentTemplate();
  const query = useDocumentTemplateById(id);
  const router = useRouter();
  const t = useI18n();
  const [isCreateAssignmentModalOpen, setIsCreateAssignmentModalOpen] = useState(false);

  if (query.isFetching) {
    return (
      <div className='flex h-full items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  const item = query.data;

  if (!item) {
    return (
      <div className='flex h-full items-center justify-center'>
        <P>Template not found</P>
      </div>
    );
  }

  return (
    <>
      <H3 className='mb-5'>Update {item.name}</H3>
      <Card className='p-6 shadow-none'>
        <DocumentTemplateForm
          item={item}
          onSubmit={async (values) => {
            await mutation.mutateAsync({ ...values, id });
          }}
        />
      </Card>

      <div className='mt-10'>
        <div className='flex justify-between items-center'>
          <H3>{t('assignment.list.title')}</H3>
          <Button variant='secondary' size='sm' onClick={() => setIsCreateAssignmentModalOpen(true)}>
            <PlusIcon className='h-4 w-4' />
            {t('assignment.list.add')}
          </Button>
        </div>
        <AssignmentTemplateTable documentTemplateId={item.id} domainId={item.domainId} />
      </div>
      <CreateAssignmentTemplateModal
        groupTemplateId={undefined}
        documentTemplateId={item.id}
        domainId={item.domainId}
        isOpen={isCreateAssignmentModalOpen}
        onOpenChange={setIsCreateAssignmentModalOpen}
      />
    </>
  );
};
