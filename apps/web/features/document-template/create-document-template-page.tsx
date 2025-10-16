'use client';

import { DocumentTemplateForm } from './document-template-form';
import { useCreateDocumentTemplate } from './use-create-document-template';
import { Card } from '@repo/ui/components/card';
import { H3 } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const CreateDocumentTemplatePage = () => {
  const mutation = useCreateDocumentTemplate();
  const router = useRouter();

  return (
    <>
      <H3 className='mb-5'>Créer un modèle de document</H3>
      <Card className='p-6 shadow-none'>
        <DocumentTemplateForm
          onSubmit={async (values) => {
            const newDocumentTemplate = await mutation.mutateAsync(values);
            router.push(`/admin/document-templates/${newDocumentTemplate.id}`);
          }}
        />
      </Card>
    </>
  );
};
