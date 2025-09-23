'use client';

import { MemberForm } from './member-form';
import { useCreateMember } from './use-create-member';
import { useI18n } from '@/locales/client';
import { Card } from '@repo/ui/components/card';
import { H3 } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';

export const CreateMemberPage = () => {
  const t = useI18n();
  const createMember = useCreateMember();
  const router = useRouter();

  return (
    <>
      <H3 className='mb-5'>{t('member.createTitle')}</H3>
      <Card className='p-6 shadow-none'>
        <MemberForm
          onSubmit={async (values) => {
            await createMember.mutateAsync(values);
            router.push('/members');
          }}
        />
      </Card>
    </>
  );
};
