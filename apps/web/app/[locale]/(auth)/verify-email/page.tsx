import { VerifyEmailPage } from '@/features/auth/verify-email-page';
import { ReactElement } from 'react';

interface PageProps {
  searchParams: Promise<{ email: string }>;
}

export default async function Page({ searchParams }: PageProps): Promise<ReactElement> {
  const { email } = await searchParams;

  return <VerifyEmailPage email={email} />;
}
