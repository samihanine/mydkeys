import { AuthLayout } from '@/features/auth/auth-layout';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import React, { Suspense } from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className='flex w-full min-h-screen items-center justify-center'>
          <LoadingSpinner />
        </div>
      }
    >
      <AuthLayout>{children}</AuthLayout>
    </Suspense>
  );
};

export default RootLayout;
