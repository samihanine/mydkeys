import { useI18n } from '@/locales/client';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { H4, Muted, Small } from '@repo/ui/components/typography';
import Link from 'next/link';

export const ListCard = ({
  title,
  href,
  items
}: {
  title: string;
  href: string;
  items: {
    title: string;
    subtitle: string;
    href: string;
    icon?: React.ReactNode;
  }[];
}) => {
  const t = useI18n();

  return (
    <Card className='flex flex-col !gap-4 border border-border shadow-none'>
      <CardHeader className='flex flex-row flex-wrap items-center justify-between'>
        <CardTitle className='text-lg'>{title}</CardTitle>

        <Link href={href} className='flex items-center gap-1'>
          <Small className='text-primary font-medium hover:underline'>{t('dashboard.labels.viewAll')}</Small>
          <ChevronDoubleRightIcon className='text-primary h-4 w-4' />
        </Link>
      </CardHeader>

      <CardContent className='flex flex-col gap-1'>
        <div className='border-border border-t' />
        {items.slice(0, 2).map((item) => (
          <Link href={item.href} key={item.title} className='flex gap-3 hover:bg-muted p-2 rounded-md'>
            <div className='flex gap-3 items-center flex-1 min-w-0'>
              {item.icon}

              <div className='flex-1 min-w-0 overflow-hidden'>
                <H4 className='overflow-hidden text-ellipsis whitespace-nowrap'>{item.title}</H4>
                <Muted>{item.subtitle}</Muted>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};
