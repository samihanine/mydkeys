'use client';

import { ProfileAvatar } from '@/features/profile/profile-avatar';
import { useCurrentProfile } from '@/features/profile/use-current-profile';
import { useI18n } from '@/locales/client';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@repo/ui/components/card';
import { H3, Muted, Small } from '@repo/ui/components/typography';
import Link from 'next/link';

export const ProfileResume = () => {
  const t = useI18n();
  const profileQuery = useCurrentProfile();

  if (!profileQuery.data) return null;

  const profile = profileQuery.data;
  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <Card className='border border-border shadow-none'>
      <CardContent className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4'>
        <div className='flex justify-center items-center flex-1 flex-col gap-3 md:gap-3 min-w-0'>
          <ProfileAvatar profile={profile} size='xl' />
          <div className='min-w-0'>
            <div className='flex items-center gap-2 flex-wrap'>
              <CardTitle className='text-base md:text-2xl'>{fullName}</CardTitle>
            </div>
          </div>
          <Link href='/settings'>
            <Button size='sm' className='gap-2 px-6'>
              <PencilSquareIcon className='h-4 w-4' />
              {t('profile.edit')}
            </Button>
          </Link>
        </div>
        <div className='space-y-3 md:space-y-2'>
          <SectionTitle>{t('profile.form.sections.personalInfo')}</SectionTitle>
          <InfoItem label={t('profile.form.fields.dateOfBirth')} value={profile.dateOfBirth} />
          <InfoItem label={t('profile.form.fields.address')} value={profile.address} />
        </div>

        <div className='space-y-3 md:space-y-2'>
          <SectionTitle>{t('profile.form.sections.education')}</SectionTitle>
          <InfoItem label={t('profile.form.fields.schoolName')} value={profile.schoolName} />
          <InfoItem label={t('profile.form.fields.schoolYear')} value={profile.schoolYear} />
          <InfoItem label={t('profile.form.fields.teacherName')} value={profile.teacherName} />
        </div>
      </CardContent>
    </Card>
  );
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return <H3 className='text-base'>{children}</H3>;
};

const InfoItem = ({ label, value }: { label: string; value?: string | null }) => {
  return (
    <div className='flex flex-col'>
      <Muted className='mb-1'>{label}</Muted>
      <Small className='font-medium'>{value || '—'}</Small>
    </div>
  );
};

const LongText = ({ label, value }: { label: string; value?: string | null }) => {
  if (!value) {
    return (
      <div className='flex flex-col'>
        <Muted className='mb-1'>{label}</Muted>
        <Small className='font-medium'>—</Small>
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      <Muted className='mb-1'>{label}</Muted>
      <div className='rounded-md border border-border bg-muted/40 p-3 md:p-2'>
        <Small className='block leading-relaxed whitespace-pre-wrap line-clamp-3 md:line-clamp-2'>{value}</Small>
      </div>
    </div>
  );
};
