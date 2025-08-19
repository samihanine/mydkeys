import { ResetPasswordPage } from '@/features/auth/reset-password-page';
import { ReactElement } from 'react';

interface PageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function Page({ searchParams }: PageProps): Promise<ReactElement> {
  const { token } = await searchParams;

  return <ResetPasswordPage token={token} />;
}
