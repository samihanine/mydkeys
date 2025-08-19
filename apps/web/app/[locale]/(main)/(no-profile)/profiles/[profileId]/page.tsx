import { UpdateProfilePage } from '@/features/profile/update-profile-page';
import { ReactElement } from 'react';

interface PageProps {
  params: Promise<{ profileId: string }>;
}

export default async function Page({ params }: PageProps): Promise<ReactElement> {
  const { profileId } = await params;
  return <UpdateProfilePage profileId={profileId} />;
}
