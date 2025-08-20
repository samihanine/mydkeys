'use client';

import { useCurrentStakeholder } from '../stakeholder/use-current-stakeholder';
import { DocumentForm } from './document-form';
import { useDocumentById } from './use-document-by-id';
import { useUpdateDocument } from './use-update-document';
import { useI18n } from '@/locales/client';
import { Card } from '@repo/ui/components/card';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H3, P } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const UpdateDocumentPage = ({ documentId }: { documentId: string }) => {
  const t = useI18n();
  const updateDocumentMutation = useUpdateDocument();
  const documentQuery = useDocumentById(documentId);
  const router = useRouter();
  const currentStakeholderQuery = useCurrentStakeholder();

  if (documentQuery.isFetching) {
    return (
      <div className='flex h-full items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  const document = documentQuery.data;

  if (!document) {
    return (
      <div className='flex h-full items-center justify-center'>
        <P>{t('document.notFound')}</P>
      </div>
    );
  }

  return (
    <>
      <H3 className='mb-5'>
        {t('document.updateTitle')} {document.title}
      </H3>
      <Card className='p-6 shadow-none'>
        <DocumentForm
          document={document}
          onSubmit={async (values) => {
            await updateDocumentMutation.mutateAsync({ ...values, id: documentId });
            router.push('/documents');
          }}
        />
      </Card>
    </>
  );
};
