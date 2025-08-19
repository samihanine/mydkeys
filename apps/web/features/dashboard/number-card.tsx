import { Card, CardContent } from '@repo/ui/components/card';
import Link from 'next/link';

export const NumberCard = ({
  title,
  number,
  icon,
  href
}: {
  title: string;
  number: number;
  icon: React.ReactNode;
  href: string;
}) => {
  return (
    <Link href={href} className='flex-1 scale-100 hover:scale-105 transition-all duration-300'>
      <Card className='flex-1'>
        <CardContent>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <div className='border border-border flex h-10 w-10 items-center justify-center rounded-md'>{icon}</div>
            </div>
            <div className='ml-5 w-0 flex-1'>
              <dl>
                <dt className='text-muted-foreground truncate text-sm font-medium'>{title}</dt>
                <dd className='text-lg font-medium'>{number}</dd>
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
