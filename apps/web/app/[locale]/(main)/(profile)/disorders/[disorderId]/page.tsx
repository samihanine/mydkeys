import { UpdateDisorderPage } from '@/features/disorder/update-disorder-page';

export default async function Page({ params }: { params: Promise<{ disorderId: string }> }) {
  const { disorderId } = await params;
  return <UpdateDisorderPage disorderId={disorderId} />;
}
