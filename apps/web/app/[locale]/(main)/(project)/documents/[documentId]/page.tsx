import { UpdateDocumentPage } from '@/features/document/update-document-page';

export default async function Page({ params }: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await params;
  return <UpdateDocumentPage documentId={documentId} />;
}
