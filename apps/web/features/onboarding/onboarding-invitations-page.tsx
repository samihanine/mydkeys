'use client';

import { MemberForm } from '../member/member-form';
import { useCreateMember } from '../member/use-create-member';
import { useCurrentUser } from '@/features/auth/use-current-user';
import { useI18n } from '@/locales/client';
import { Button } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const OnboardingInvitationsPage = () => {
  const t = useI18n();
  const userQuery = useCurrentUser();
  const createMemberMutation = useCreateMember();
  const router = useRouter();
  const currentUserQuery = useCurrentUser();
  const [memberCount, setMemberCount] = useState(1);

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      {userQuery.isFetching || currentUserQuery.isFetching ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='w-full flex flex-col gap-6'>
            {Array.from({ length: memberCount }).map((_, index) => (
              <Card key={index} className='p-6'>
                <MemberForm
                  member={{}}
                  onSubmit={async (values) => {
                    await createMemberMutation.mutateAsync(values);
                    setMemberCount(memberCount + 1);
                  }}
                />
              </Card>
            ))}
          </div>
        </>
      )}
      <Button className='w-full' variant='outline' onClick={() => setMemberCount(memberCount + 1)}>
        <PlusIcon className='mr-1 h-4 w-4' />
        Ajouter un membre
      </Button>
      <Button className='w-full mt-4' variant='secondary' onClick={() => router.push('/')}>
        Terminer
      </Button>
    </div>
  );
};
