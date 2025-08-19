import { InvitationPage } from '@/features/stakeholder/invitation-page';

export default async function InvitationPageComponent({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { token } = await searchParams;
  return <InvitationPage token={token as string} />;
}
