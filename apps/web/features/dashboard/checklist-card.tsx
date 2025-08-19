import { useI18n } from '@/locales/client';
import { FireIcon } from '@heroicons/react/24/solid';
import { Button } from '@repo/ui/components/button';
import { Card, CardHeader } from '@repo/ui/components/card';
import { H2, H3, H4 } from '@repo/ui/components/typography';
import { cn } from '@repo/ui/lib/utils';
import { Check, Plus } from 'lucide-react';
import Link from 'next/link';

export type ChecklistItem = {
  title: string;
  isChecked: boolean;
  href: string;
};

export const ChecklistCard = ({ list, title }: { list: ChecklistItem[]; title: string }) => {
  const t = useI18n();
  const percentage = (list.filter((item) => item.isChecked).length / list.length) * 100;

  return (
    <Card>
      <div className='flex flex-col gap-4 px-6'>
        <div className='flex items-center gap-2 justify-between'>
          <div className='flex items-center gap-2'>
            <FireIcon className='w-6 h-6 text-secondary' />
            <H4>{title}</H4>
          </div>

          <p className='text-lg font-medium'>
            {percentage.toFixed(0)}%{' '}
            <span className='text-base text-muted-foreground'>{t('dashboard.checklist.completed')}</span>
          </p>
        </div>

        <div className='w-full h-2 bg-gray-200 rounded-full'>
          <div className='h-full bg-primary rounded-full' style={{ width: `${percentage}%` }} />
        </div>
      </div>

      <div className='flex flex-col gap-4 px-6'>
        {list.map((item) => (
          <div key={item.title} className='flex items-center gap-2'>
            <div
              className={cn(
                'flex items-center justify-center w-6 h-6 rounded-full',
                item.isChecked && 'bg-primary text-white border-2 border-primary',
                !item.isChecked && 'border-2 border-border'
              )}
            >
              {item.isChecked && <Check className='w-3 h-3 text-white' />}
            </div>
            <div className='flex justify-between w-full items-center flex-wrap gap-2'>
              <span className='text-sm font-medium'>{item.title}</span>
              {!item.isChecked && (
                <Link href={item.href}>
                  <Button size={'sm'} variant={'secondary'} className='px-10'>
                    {t('dashboard.checklist.start')}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
