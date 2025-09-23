import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const Tabs = ({
  links,
  className
}: {
  links: {
    href: string;
    label: string;
  }[];
  className?: string;
}) => {
  const pathname = usePathname();

  const currentTab = useMemo(() => {
    return (
      links.filter((link) => pathname.includes(link.href)).sort((a, b) => b.href.length - a.href.length)[0] || links[0]
    );
  }, [links, pathname]);

  return (
    <div className={cn('border-border flex flex-wrap border-b gap-4 md:flex-row md:items-end md:pb-0', className)}>
      {links.map(({ href, label }) => (
        <Link className='mb-0' key={href} href={href}>
          <div
            className={cn(
              'text-muted-foreground hover:text-primary relative w-full border-transparent px-1 py-3 pb-2 text-base font-medium whitespace-nowrap md:border-b-2',
              currentTab?.href === href ? 'border-primary text-primary' : ''
            )}
          >
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
};
