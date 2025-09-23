import { UpdateMemberTemplatePage } from '@/features/member-template/update-member-template-page';

export default async function Page({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id } = await params;
  return <UpdateMemberTemplatePage id={id} />;
}
