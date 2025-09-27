'use client';

import { ChangeLocale } from '@/components/change-locale';
import { useI18n } from '@/locales/client';
import { Card } from '@repo/ui/components/card';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export const AuthLayout = ({ children }: PropsWithChildren) => {
  const t = useI18n();

  return (
    <div className='flex w-full justify-center p-6 md:items-center min-h-screen'>
      <Card className='w-full h-fit max-w-2xl flex-1 p-5 md:p-10 flex'>
        <Image
          src='/logo-text.png'
          alt='MyDkeys'
          width={100}
          height={100}
          className='h-auto max-w-64 mx-auto w-full mb-10'
        />
        {children as React.ReactNode}

        <div className='flex justify-center w-full mt-10'>
          <ChangeLocale />
        </div>
      </Card>
    </div>
  );
};
