'use client';

import { useForgotPassword } from './use-forgot-password';
import { useI18n } from '@/locales/client';
import { AtSymbolIcon } from '@heroicons/react/24/solid';
import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { H2, P } from '@repo/ui/components/typography';
import { toast } from '@repo/ui/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export const ForgotPasswordPage = () => {
  const t = useI18n();
  const [email, setEmail] = useState('');
  const forgotPasswordMutation = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await forgotPasswordMutation.mutateAsync({ email });

    if (result.error) {
      toast({
        title: t('common.error'),
        description: result.error.message
      });
    }

    toast({
      title: t('common.success'),
      description: t('forgotPassword.successMessage')
    });

    setEmail('');
  };

  const isLoading = forgotPasswordMutation.isPending;

  return (
    <div className='mx-auto w-full max-w-md'>
      <div className='mb-6 flex flex-col gap-5'>
        <div>
          <H2 className='mb-2 text-center'>{t('forgotPassword.title')}</H2>

          <P className='mb-5 text-center'>{t('forgotPassword.subtitle')}</P>
        </div>

        <form className='flex flex-col gap-12' onSubmit={handleSubmit}>
          <Label className='flex flex-col gap-2'>
            <P>{t('common.email')}</P>
            <Input
              Icon={AtSymbolIcon}
              type='email'
              placeholder={t('forgotPassword.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Label>

          <div className='flex flex-col gap-4'>
            <Button type='submit' variant='secondary' className='w-full' disabled={isLoading}>
              {isLoading ? <Loader2 className='h-4 w-4 animate-spin' /> : t('forgotPassword.submitButton')}
            </Button>

            <Link href='/login'>
              <Button variant='outline' className='w-full'>
                {t('common.backToHome')}
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
