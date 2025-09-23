import { UpdateSpecificationTemplatePage } from '@/features/specification-template/update-specification-template-page';

export default async function Page({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id } = await params;
  return <UpdateSpecificationTemplatePage id={id} />;
}
