import { UpdateGroupPage } from '@/features/group/update-group-page';

export default async function Page({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;

  return <UpdateGroupPage groupId={groupId} />;
}
