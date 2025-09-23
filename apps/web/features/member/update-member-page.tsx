'use client';

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

  if (memberQuery.isLoading) {
    return (
      <div className='flex justify-center py-8'>
        <LoadingSpinner />
      </div>
    );
  }

  if (memberQuery.isError || !memberQuery.data) {
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
          onSubmit={async (values) => {
            await updateMember.mutateAsync({ ...values, id: memberQuery.data.id });
            router.push('/members');
          }}
        />
      </Card>
    </>
  );
};
