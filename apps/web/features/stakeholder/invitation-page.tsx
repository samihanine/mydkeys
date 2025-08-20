'use client';

import { useCurrentUser } from '../auth/use-current-user';
import { useAcceptInvitation } from './use-accept-invitation';
import { useInvitationByToken } from './use-invitation-by-token';
import { useStakeholderById } from './use-stakeholder-by-id';
import { useI18n } from '@/locales/client';
import { Button } from '@repo/ui/components/button';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H2, P } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const InvitationPage = ({ token }: { token: string }) => {
  const t = useI18n();
  const invitationQuery = useInvitationByToken(token);
  const acceptInvitation = useAcceptInvitation();
  const currentUserQuery = useCurrentUser();
  const router = useRouter();
  const stakeholderQuery = useStakeholderById(invitationQuery.data?.stakeholderId ?? undefined);

  if (invitationQuery.isFetching || currentUserQuery.isFetching) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <H2>
        {t('stakeholder.invitationTitle', {
          firstName: stakeholderQuery.data?.displayName?.split(' ')?.[0] || '',
          lastName: stakeholderQuery.data?.displayName?.split(' ')?.slice(1)?.join(' ') || ''
        })}
      </H2>

      {currentUserQuery.data && (
        <>
          {t('stakeholder.alreadyLoggedIn', { name: currentUserQuery.data.name })}
          <div className='flex gap-2 mt-8'>
            <Button
              disabled={acceptInvitation.isPending}
              onClick={() => {
                acceptInvitation.mutate({ token });
                router.push('/projects');
              }}
            >
              {acceptInvitation.isPending
                ? t('stakeholder.invitation.buttons.accepting')
                : t('stakeholder.invitation.buttons.accept')}
            </Button>
            <Button variant='outline' onClick={() => router.push('/')}>
              {t('stakeholder.invitation.buttons.ignore')}
            </Button>
          </div>
        </>
      )}

      {!currentUserQuery.data && (
        <>
          <P>{t('stakeholder.createAccountMessage')}</P>
          <Button className='mt-8' onClick={() => router.push('/register')}>
            {t('stakeholder.invitation.buttons.createAccount')}
          </Button>
        </>
      )}
    </>
  );
};
