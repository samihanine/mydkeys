'use client';

import { useI18n } from '@/locales/client';
import { Button } from '@repo/ui/components/button';
import { H2, P } from '@repo/ui/components/typography';
import Link from 'next/link';

export const VerifyEmailPage = ({ email }: { email: string }) => {
  const t = useI18n();

  const getEmailProvider = (email: string) => {
    const domain = email.split('@')[1]?.toLowerCase();

    if (!domain) return null;

    const providers = {
      'gmail.com': 'https://mail.google.com',
      'outlook.com': 'https://outlook.live.com',
      'hotmail.com': 'https://outlook.live.com',
      'yahoo.com': 'https://mail.yahoo.com',
      'icloud.com': 'https://www.icloud.com/mail',
      'protonmail.com': 'https://mail.proton.me',
      'aol.com': 'https://mail.aol.com',
      'zoho.com': 'https://mail.zoho.com'
    };

    return (providers as Record<string, string>)[domain] || null;
  };

  const emailProvider = getEmailProvider(email);

  const handleVerifyEmail = () => {
    if (emailProvider) {
      window.open(emailProvider, '_blank');
    }
  };

  return (
    <div className='mx-auto w-full max-w-md'>
      <div className='mb-6 flex flex-col gap-5'>
        <div className='mb-10 flex flex-col justify-center'>
          <H2 className='mb-2 text-center'>{t('verifyEmail.title')}</H2>

          <P className='text-center'>{t('verifyEmail.subtitle')}</P>
          {email && (
            <>
              <P className='mt-2 text-center'>{t('verifyEmail.sentMessage')}</P>
              <strong className='text-center'>{email}</strong>
            </>
          )}
        </div>

        {emailProvider && (
          <Button variant='secondary' className='w-full' onClick={handleVerifyEmail}>
            {t('verifyEmail.accessInboxButton')}
          </Button>
        )}

        <Link href='/login'>
          <Button variant='outline' className='w-full'>
            {t('common.backToHome')}
          </Button>
        </Link>
      </div>
    </div>
  );
};
