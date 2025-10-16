'use client';

import { Tabs } from '../../components/tabs';
import { useCurrentUser } from '@/features/auth/use-current-user';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { cn } from '@repo/ui/lib/utils';
import { redirect } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

export const AdminLayout = ({ children }: PropsWithChildren) => {
  const currentUserQuery = useCurrentUser();

  if (!currentUserQuery.data && !currentUserQuery.isFetching) {
    return redirect('/login');
  }

  if (currentUserQuery.data?.role !== 'ADMIN' && !currentUserQuery.isFetching) {
    return redirect('/projects');
  }

  const links = [
    { href: '/admin', label: 'Tableau de bord' },
    { href: '/admin/users', label: 'Utilisateurs' },
    //{ href: '/admin/domains', label: 'Domains' },
    { href: '/admin/document-templates', label: 'Modèles de documents' },
    { href: '/admin/group-templates', label: 'Modèles de parties prenantes' }
    // { href: '/admin/specification-templates', label: "Modèles de types d'informations" }
  ];

  return (
    <div className='flex flex-1 w-full flex-col overflow-y-auto '>
      <div className='border-border flex-1 overflow-y-auto px-5 md:px-10 py-5 md:py-5 min-h-0 '>
        <p className='text-sm max-w-screen-lg mx-auto text-center font-medium text-amber-500 border border-amber-500 bg-amber-50 rounded-md p-2 mb-8'>
          Cette interface est réservée aux employés de MyDkeys. Merci de ne pas partager les accès avec des tiers.
        </p>

        {currentUserQuery.isFetching || currentUserQuery.isRefetching ? (
          <div className='flex h-full w-full items-center justify-center'>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className={cn('w-full max-w-screen-lg mx-auto px-5 md:px-8')}>
              <Tabs className='mb-10' links={links} />
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
