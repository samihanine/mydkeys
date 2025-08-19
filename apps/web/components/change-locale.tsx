'use client';

import { useChangeLocale, useCurrentLocale } from '@/locales/client';
import { Button } from '@repo/ui/components/button';

export function ChangeLocale() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <div className='flex'>
      <Button
        variant={locale === 'en' ? 'default' : 'outline'}
        className='rounded-r-none'
        onClick={() => changeLocale('en')}
        size='sm'
      >
        EN
      </Button>
      <Button
        variant={locale === 'fr' ? 'default' : 'outline'}
        className='rounded-l-none'
        onClick={() => changeLocale('fr')}
        size='sm'
      >
        FR
      </Button>
    </div>
  );
}
