'use client';

import { useCurrentUser } from '@/features/auth/use-current-user';
import { redirect } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const currentUserQuery = useCurrentUser();

  if (currentUserQuery.isFetching) {
    return null;
  }

  if (currentUserQuery.data?.role !== 'ADMIN') {
    return redirect('/dashboard');
  }

  return <div>{children}</div>;
}
