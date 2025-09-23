import { UpdateDomainPage } from '@/features/domain/update-domain-page';

export default async function Page({ params }: { params: Promise<{ locale: string; domainId: string }> }) {
  const { domainId } = await params;
  return <UpdateDomainPage domainId={domainId} />;
}
