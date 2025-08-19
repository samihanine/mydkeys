'use client';

import { ChangeLocale } from '@/components/change-locale';
import { useI18n } from '@/locales/client';
import { Card } from '@repo/ui/components/card';
import { H1, P } from '@repo/ui/components/typography';
import { PropsWithChildren } from 'react';

export const AuthLayout = ({ children }: PropsWithChildren) => {
  const t = useI18n();

  return (
    <div className='flex h-screen w-full justify-center pt-10 md:items-center md:pt-0'>
      <Card className='w-full max-w-2xl flex-1 p-5 md:p-10'>
        {children as React.ReactNode}

        <div className='flex justify-center w-full mt-10'>
          <ChangeLocale />
        </div>
      </Card>
    </div>
  );
};
