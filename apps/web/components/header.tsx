'use client';

import { ChangeLocale } from '@/components/change-locale';
import { useCurrentUser } from '@/features/auth/use-current-user';
import { useLogOut } from '@/features/auth/use-log-out';
import { ProjectNavigation } from '@/features/project/project-navigation';
import { BellAlertIcon, UserIcon } from '@heroicons/react/24/outline';
import { Button } from '@repo/ui/components/button';
import { H4, Small } from '@repo/ui/components/typography';
import Image from 'next/image';

export const Header = () => {
  const currentUserQuery = useCurrentUser();
  const logOutMutation = useLogOut();

  return (
    <div className='w-full flex items-center justify-between gap-4 border-b border-border h-16 px-8 py-2 bg-white z-10'>
      <Image src='/logo-text.png' alt='MyDkeys' width={100} height={100} className='h-full w-auto' />

      <div className='flex w-full flex-row-reverse items-center justify-between gap-6 md:w-fit md:flex-row md:justify-start'>
        <div className='items-center gap-2 hidden'>
          <BellAlertIcon className='text-muted-foreground h-6 w-6' />
          <Small className='text-muted-foreground hidden md:block'>Notifications</Small>
        </div>
        {currentUserQuery?.data && (
          <>
            <div className='font-medium text-sm text-secondary'>{currentUserQuery.data.email}</div>

            <Button variant='outline' size='sm' onClick={() => logOutMutation.mutate()}>
              Se déconnecter
            </Button>
          </>
        )}

        <ChangeLocale />
      </div>
    </div>
  );
};
