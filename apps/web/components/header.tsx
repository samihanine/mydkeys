'use client';

import { ChangeLocale } from '@/components/change-locale';
import { useCurrentUser } from '@/features/auth/use-current-user';
import { useLogOut } from '@/features/auth/use-log-out';
import { ProfileNavigation } from '@/features/profile/profile-navigation';
import { BellAlertIcon, UserIcon } from '@heroicons/react/24/outline';
import { Button } from '@repo/ui/components/button';
import { H4, Small } from '@repo/ui/components/typography';

export const Header = () => {
  const currentUserQuery = useCurrentUser();
  const logOutMutation = useLogOut();

  return (
    <div className='w-full flex items-center justify-between gap-4 border-b border-border h-16 px-8 bg-white z-10'>
      <H4 className='font-semibold text-2xl text-primary md:ml-10'>MyDkeys</H4>

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
