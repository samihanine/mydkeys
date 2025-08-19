'use client';

import { DocumentForm } from './document-form';
import { useCreateDocument } from './use-create-document';
import { useI18n } from '@/locales/client';
import { Card } from '@repo/ui/components/card';
import { H3 } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const CreateDocumentPage = () => {
  const t = useI18n();
  const createDocument = useCreateDocument();
  const router = useRouter();

  return (
    <>
      <H3 className='mb-5'>{t('document.createTitle')}</H3>
      <Card className='p-6 shadow-none'>
        <DocumentForm
          onSubmit={async (values) => {
            await createDocument.mutateAsync(values);
            router.push('/documents');
          }}
        />
      </Card>
    </>
  );
};
