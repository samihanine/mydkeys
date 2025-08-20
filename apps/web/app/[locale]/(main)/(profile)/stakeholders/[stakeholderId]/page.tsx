import { UpdateStakeholderPage } from '@/features/stakeholder/update-stakeholder-page';

export default async function SecurityStakeholdersPage({ params }: { params: Promise<{ stakeholderId: string }> }) {
  const { stakeholderId } = await params;

  return <UpdateStakeholderPage stakeholderId={stakeholderId} />;
}
