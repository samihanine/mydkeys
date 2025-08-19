'use client';

import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const Tabs = ({
  links
}: {
  links: {
    href: string;
    label: string;
  }[];
}) => {
  const pathname = usePathname();

  const currentTab = useMemo(() => {
    const fullPathName = pathname.includes('/fr/') ? pathname.replace('/fr/', '/') : pathname;
    let tab = links.filter(({ href }) => fullPathName.startsWith(href));

    if (tab.length === 1) {
      return tab[0];
    }

    if (tab.length > 1) {
      return tab.sort((a, b) => b.href.length - a.href.length)[0];
    }

    return links[0];
  }, [links, pathname]);

  return (
    <div className='border-border flex flex-col gap-5 flex-wrap md:flex-row md:items-end md:pb-0'>
      {links.map(({ href, label }) => (
        <Link className='mb-0' key={href} href={href}>
          <div
            className={cn(
              'text-muted-foreground bg-muted hover:bg-secondary rounded-md hover:text-white relative text-center border-transparent w-full md:w-full lg:w-40 px-5 py-2 text-sm font-medium whitespace-nowrap md:border-b-2',
              currentTab?.href === href ? 'bg-secondary text-white' : ''
            )}
          >
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
};
