'use client';

import { useMemberTemplates } from '../member-template/use-member-templates';
import { MemberForm } from '../member/member-form';
import { useCreateMember } from '../member/use-create-member';
import { useMembers } from '../member/use-members';
import { useCurrentProject } from '../project/use-current-project';
import { useUpdateProject } from '../project/use-update-project';
import { useCurrentUser } from '@/features/auth/use-current-user';
import { useI18n } from '@/locales/client';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { getIcon } from '@repo/ui/lib/utils';
import { CheckIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const OnboardingInvitationsPage = () => {
  const t = useI18n();
  const userQuery = useCurrentUser();
  const createMemberMutation = useCreateMember();
  const router = useRouter();
  const projectQuery = useCurrentProject();
  const memberTemplatesQuery = useMemberTemplates();
  const membersQuery = useMembers();
  const currentUserQuery = useCurrentUser();

  useEffect(() => {
    if (!userQuery.data && !userQuery.isFetching) {
      router.push('/login');
    }
  }, [userQuery, router]);

  const memberTemplates = memberTemplatesQuery.data?.filter((memberTemplate) =>
    projectQuery.data?.selectedMemberTemplateIds?.includes(memberTemplate.id)
  );

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      {userQuery.isFetching || currentUserQuery.isFetching ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className='w-full flex flex-col gap-6'>
            {memberTemplates?.map((memberTemplate) => {
              const Icon = getIcon(memberTemplate.icon);

              const isAlreadyAdded = membersQuery.data?.some((member) => member.memberTemplateId === memberTemplate.id);

              if (isAlreadyAdded) {
                return (
                  <Card key={memberTemplate.id} className='p-6 flex justify-between items-center flex-row'>
                    <Badge variant='secondary' className=''>
                      <Icon className='size-4 mr-2' />

                      {memberTemplate.name}
                    </Badge>

                    <span className='text-lg flex items-center gap-2 text-secondary'>
                      {t('member.list.alreadyAdded')} <CheckIcon className='size-4' />
                    </span>
                  </Card>
                );
              }

              return (
                <Card key={memberTemplate.id} className='p-6'>
                  <Badge variant='secondary' className=''>
                    <Icon className='size-4 mr-2' />

                    {memberTemplate.name}
                  </Badge>
                  <MemberForm
                    member={{ memberTemplateId: memberTemplate.id }}
                    onSubmit={async (values) => {
                      await createMemberMutation.mutateAsync(values);
                    }}
                  />
                </Card>
              );
            })}
          </div>
        </>
      )}
      <Button className='w-full max-w-md mx-auto mt-4' variant='secondary' onClick={() => router.push('/')}>
        Terminer
      </Button>
    </div>
  );
};
