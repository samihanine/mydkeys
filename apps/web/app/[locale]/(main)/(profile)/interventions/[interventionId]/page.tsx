import { UpdateInterventionPage } from '@/features/intervention/update-intervention-page';

export default async function Page({ params }: { params: Promise<{ interventionId: string }> }) {
  const { interventionId } = await params;
  return <UpdateInterventionPage interventionId={interventionId} />;
}
