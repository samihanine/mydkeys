import { UpdateGroupTemplatePage } from '@/features/group-template/update-group-template-page';

export default async function Page({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id } = await params;
  return <UpdateGroupTemplatePage id={id} />;
}
