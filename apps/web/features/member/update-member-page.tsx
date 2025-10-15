'use client';

import { useGroupMembersByCurrentProject } from '../group-member/use-group-members-by-current-project';
import { useUpsertGroupMembers } from '../group-member/use-upsert-group-members';
import { MemberForm } from './member-form';
import { useMemberById } from './use-member-by-id';
import { useUpdateMember } from './use-update-member';
import { useI18n } from '@/locales/client';
import { Card } from '@repo/ui/components/card';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H3 } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const UpdateMemberPage = ({ memberId }: { memberId: string }) => {
  const t = useI18n();
  const memberQuery = useMemberById(memberId);
  const updateMember = useUpdateMember();
  const router = useRouter();
  const upsertGroupMemberMutation = useUpsertGroupMembers();
  const groupMembersQuery = useGroupMembersByCurrentProject();

  if (memberQuery.isLoading || groupMembersQuery.isLoading) {
    return (
      <div className='flex justify-center py-8'>
        <LoadingSpinner />
      </div>
    );
  }

  if (memberQuery.isError || !memberQuery.data || groupMembersQuery.isError) {
    return (
      <div className='text-center py-8'>
        <p className='text-red-500'>{t('member.loadingError')}</p>
      </div>
    );
  }

  return (
    <>
      <H3 className='mb-5'>{t('member.updateTitle')}</H3>
      <Card className='p-6 shadow-none'>
        <MemberForm
          member={memberQuery.data}
          isLoading={updateMember.isPending || upsertGroupMemberMutation.isPending}
          onSubmit={async (values) => {
            await updateMember.mutateAsync({ ...values, id: memberQuery.data.id });
            await upsertGroupMemberMutation.mutateAsync({ memberId: memberQuery.data.id, groupIds: values.groupIds });
            router.push('/members');
          }}
          groupIds={groupMembersQuery.data
            ?.filter((groupMember) => groupMember.memberId === memberQuery.data.id)
            .map((groupMember) => groupMember.groupId)}
        />
      </Card>
    </>
  );
};
