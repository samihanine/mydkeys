'use client';

import { useUpsertGroupMembers } from '../group-member/use-upsert-group-members';
import { MemberForm } from '../member/member-form';
import { useCreateMember } from '../member/use-create-member';
import { useMembersByCurrentProject } from '../member/use-members-by-current-project';
import { useCurrentUser } from '@/features/auth/use-current-user';
import { useI18n } from '@/locales/client';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent } from '@repo/ui/components/card';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { CheckCircleIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const OnboardingInvitationsPage = () => {
  const t = useI18n();
  const userQuery = useCurrentUser();
  const createMemberMutation = useCreateMember();
  const router = useRouter();
  const currentUserQuery = useCurrentUser();
  const upsertGroupMemberMutation = useUpsertGroupMembers();
  const membersQuery = useMembersByCurrentProject();
  const [memberFormValues, setMemberFormValues] = useState<object>({});

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      {userQuery.isFetching || currentUserQuery.isFetching ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='w-full flex flex-col gap-6'>
            {membersQuery.data
              ?.filter((member) => !member.isAdministrator)
              .map((member) => (
                <Card key={member.id} className='bg-green-50 border-green-600 text-green-600'>
                  <CardContent className='flex items-center gap-2 justify-between'>
                    <span>Invitation envoyée à {member.displayName}</span> <CheckCircleIcon className='h-6 w-6' />
                  </CardContent>
                </Card>
              ))}
            <Card className={`p-6`}>
              <MemberForm
                member={memberFormValues}
                onSubmit={async ({ groupIds, ...values }) => {
                  const member = await createMemberMutation.mutateAsync(values);
                  await upsertGroupMemberMutation.mutateAsync({ memberId: member.id, groupIds });
                  setMemberFormValues({});
                }}
              />
            </Card>
          </div>
        </>
      )}

      <Button className='w-full mt-4' variant='secondary' onClick={() => router.push('/')}>
        Terminer
      </Button>
    </div>
  );
};
