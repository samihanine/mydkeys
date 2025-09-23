import { UpdateDocumentTemplatePage } from '@/features/document-template/update-document-template-page';

export default async function Page({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id } = await params;
  return <UpdateDocumentTemplatePage id={id} />;
}
