'use client';

import { Sidebar } from '../../components/sidebar';
import { useCurrentProject } from './use-current-project';
import { ChangeLocale } from '@/components/change-locale';
import { useCurrentUser } from '@/features/auth/use-current-user';
import { BellAlertIcon, UserIcon } from '@heroicons/react/24/outline';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { Small } from '@repo/ui/components/typography';
import { cn } from '@repo/ui/lib/utils';
import { redirect } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

export const ProjectLayout = ({ children }: PropsWithChildren) => {
  const currentUserQuery = useCurrentUser();
  const currentProjectQuery = useCurrentProject();

  if (!currentUserQuery.data && !currentUserQuery.isFetching) {
    return redirect('/login');
  }

  if (!currentUserQuery.data?.selectedProjectId && !currentUserQuery.isFetching) {
    return redirect('/projects');
  }

  if (!currentProjectQuery?.data && !currentProjectQuery.isFetching) {
    return redirect('/onboarding');
  }

  return (
    <div className='flex flex-1 w-full flex-col md:flex-row overflow-hidden min-h-0'>
      <Sidebar />
      <div className='bg-background border-border flex-1 overflow-y-auto p-5 md:p-10 border-l min-h-0'>
        {currentUserQuery.isFetching ||
        currentProjectQuery.isFetching ||
        currentProjectQuery.isRefetching ||
        currentUserQuery.isRefetching ? (
          <div className='flex h-full w-full items-center justify-center'>
            <LoadingSpinner />
          </div>
        ) : (
          <div className={cn('w-full max-w-screen-lg mx-auto px-5 md:px-8 h-full min-h-0')}>{children}</div>
        )}
      </div>
    </div>
  );
};
