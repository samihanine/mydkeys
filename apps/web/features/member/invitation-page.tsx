'use client';

import { useCurrentUser } from '../auth/use-current-user';
import { useAcceptInvitation } from './use-accept-invitation';
import { useInvitationByToken } from './use-invitation-by-token';
import { useMemberById } from './use-member-by-id';
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
  const memberQuery = useMemberById(invitationQuery.data?.memberId ?? undefined);

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
        {t('member.invitationTitle', {
          firstName: memberQuery.data?.displayName?.split(' ')?.[0] || '',
          lastName: memberQuery.data?.displayName?.split(' ')?.slice(1)?.join(' ') || ''
        })}
      </H2>

      {currentUserQuery.data && (
        <>
          {t('member.alreadyLoggedIn', { name: currentUserQuery.data.name })}
          <div className='flex gap-2 mt-8'>
            <Button
              disabled={acceptInvitation.isPending}
              onClick={() => {
                acceptInvitation.mutate({ token });
                router.push('/projects');
              }}
            >
              {acceptInvitation.isPending
                ? t('member.invitation.buttons.accepting')
                : t('member.invitation.buttons.accept')}
            </Button>
            <Button variant='outline' onClick={() => router.push('/')}>
              {t('member.invitation.buttons.ignore')}
            </Button>
          </div>
        </>
      )}

      {!currentUserQuery.data && (
        <>
          <P>{t('member.createAccountMessage')}</P>
          <Button className='mt-8' onClick={() => router.push('/register')}>
            {t('member.invitation.buttons.createAccount')}
          </Button>
        </>
      )}
    </>
  );
};
