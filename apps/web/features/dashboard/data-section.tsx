import { Badge } from '@repo/ui/components/badge';
import { H3, P } from '@repo/ui/components/typography';
import Link from 'next/link';
import { ReactNode } from 'react';

interface DataSectionProps {
  title: string;
  icon: ReactNode;
  items: Array<{
    title: string;
    subtitle?: string;
    badge?: string;
    href: string;
  }>;
  emptyMessage: string;
}

export const DataSection = ({ title, icon, items, emptyMessage }: DataSectionProps) => {
  return (
    <div>
      <H3 className='flex items-center gap-2 mb-4'>
        {icon}
        {title}
        <Badge variant='secondary' className='ml-auto'>
          {items.length}
        </Badge>
      </H3>
      {items.length > 0 ? (
        <div className='space-y-2'>
          {items.slice(0, 3).map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className='flex border border-border items-center gap-2 py-3 px-4 rounded-lg hover:bg-muted'
            >
              <span className='font-medium'>{item.title}</span>
              {item.badge && (
                <Badge variant='outline' className='text-xs'>
                  {item.badge}
                </Badge>
              )}
              {item.subtitle && <span className='text-xs text-muted-foreground ml-auto'>{item.subtitle}</span>}
            </Link>
          ))}
        </div>
      ) : (
        <P className='text-muted-foreground'>{emptyMessage}</P>
      )}
    </div>
  );
};
