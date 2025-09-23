import { UpdateMemberPage } from '@/features/member/update-member-page';

export default async function SecurityMembersPage({ params }: { params: Promise<{ memberId: string }> }) {
  const { memberId } = await params;

  return <UpdateMemberPage memberId={memberId} />;
}
