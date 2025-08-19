import { UpdateMemberPage } from '@/features/stakeholder/update-stakeholder-page';

export default async function SecurityMembersPage({ params }: { params: Promise<{ memberId: string }> }) {
  const { memberId } = await params;

  return <UpdateMemberPage memberId={memberId} />;
}
