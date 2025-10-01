import { ProjectAvatar } from '../features/project/project-avatar';
import { ProjectNavigation } from '../features/project/project-navigation';
import { useCurrentProject } from '../features/project/use-current-project';
import { useCurrentMember } from '@/features/member/use-current-member';
import { useI18n } from '@/locales/client';
import {
  Bars3Icon,
  Cog6ToothIcon as Cog6ToothIconOutline,
  DocumentTextIcon as DocumentTextIconOutline,
  HomeIcon as HomeIconOutline,
  KeyIcon as KeyIconOutline,
  UserGroupIcon as UserGroupIconOutline,
  XMarkIcon
} from '@heroicons/react/24/outline';
import {
  Cog6ToothIcon as Cog6ToothIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  HomeIcon as HomeIconSolid,
  KeyIcon as KeyIconSolid,
  UserGroupIcon as UserGroupIconSolid
} from '@heroicons/react/24/solid';
import { useIsMobile } from '@repo/ui/hooks/use-is-mobile';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SVGProps, useMemo, useState } from 'react';

type MenuItem = {
  name: string;
  href: string;
  IconSolid: React.ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  IconOutline: React.ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  hidden?: boolean;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

export const Sidebar = () => {
  const t = useI18n();
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentProjectQuery = useCurrentProject();
  const currentMemberQuery = useCurrentMember();

  const menuSections: MenuSection[] = useMemo(() => {
    return [
      {
        title: t('sidebar.sections.general'),
        items: [
          {
            name: t('sidebar.items.dashboard'),
            href: '/dashboard',
            IconSolid: HomeIconSolid,
            IconOutline: HomeIconOutline
          }
        ]
      },
      {
        title: t('sidebar.sections.project'),
        items: [
          {
            name: t('sidebar.items.documents'),
            href: '/documents',
            IconSolid: DocumentTextIconSolid,
            IconOutline: DocumentTextIconOutline
          }
        ]
      },
      {
        title: t('sidebar.sections.settings'),
        items: [
          {
            name: t('sidebar.items.members'),
            href: '/members',
            IconSolid: UserGroupIconSolid,
            IconOutline: UserGroupIconOutline
          },
          {
            name: t('sidebar.items.groups'),
            href: '/groups',
            IconSolid: KeyIconSolid,
            IconOutline: KeyIconOutline
          },
          {
            name: t('sidebar.items.settings'),
            href: '/settings',
            IconSolid: Cog6ToothIconSolid,
            IconOutline: Cog6ToothIconOutline
          }
        ]
      }
    ];
  }, [currentMemberQuery.data]);

  const currentMenuItem = useMemo(() => {
    const allItems = menuSections.flatMap((section) => section.items);
    const fullPathName = pathname.includes('/fr/') ? pathname.replace('/fr/', '/') : pathname;
    let matchingItems = allItems.filter(({ href }) => fullPathName.startsWith(href));

    if (matchingItems.length === 1) {
      return matchingItems[0];
    }

    if (matchingItems.length > 1) {
      return matchingItems.sort((a, b) => b.href.length - a.href.length)[0];
    }

    return allItems[0];
  }, [menuSections, pathname]);

  const renderSidebarContent = () => (
    <div className='flex w-full flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className='flex flex-col gap-2'>
            <span className='text-sm font-medium text-gray-400'>{section.title}</span>
            <div className='flex flex-col gap-1'>
              {section.items.map((item, itemIndex) => {
                const isActive = currentMenuItem?.href === item.href;
                const isHovered = hoveredItem === item.href;

                if (item.hidden) {
                  return null;
                }

                return (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className={cn(
                      'hover:border-border flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 hover:border hover:bg-primary hover:text-white',
                      isActive && 'border-border border bg-primary text-primary-foreground'
                    )}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                  >
                    {isActive || isHovered ? (
                      <item.IconSolid className='text-white h-5 w-5' />
                    ) : (
                      <item.IconOutline className='text-primary h-5 w-5' />
                    )}
                    <span className='text-sm font-medium'>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Mobile header
  if (isMobile) {
    return (
      <>
        <div className='fixed left-0 right-0 top-0 z-30 flex items-center justify-between border-b bg-white p-4'>
          <Link href='/dashboard' className='flex items-center gap-2'>
            <Image src='/logo-text.png' alt='MyDkeys' width={100} height={100} />
          </Link>

          <div className='flex items-center gap-4'>
            {currentProjectQuery.data && <ProjectAvatar project={currentProjectQuery.data} />}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className='cursor-pointer rounded-md p-1 text-gray-600 hover:bg-gray-100'
            >
              <Bars3Icon className='h-6 w-6' />
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className='fixed inset-0 z-40 flex flex-col bg-white p-4'>
            <div className='mb-6 flex items-center justify-between'>
              <Link href='/dashboard' className='flex items-center gap-2'>
                <Image src='/logo-text.png' alt='MyDkeys' width={100} height={100} />
              </Link>

              <div className='flex items-center gap-4'>
                {currentProjectQuery.data && <ProjectAvatar project={currentProjectQuery.data} />}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className='cursor-pointer rounded-md p-1 text-gray-600 hover:bg-gray-100'
                >
                  <XMarkIcon className='h-6 w-6' />
                </button>
              </div>
            </div>

            <div className='flex flex-grow flex-col justify-between'>
              {renderSidebarContent()}
              <div className='mt-auto w-full'>
                <ProjectNavigation />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className='w-64 flex flex-col justify-between p-8'>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-4'>{renderSidebarContent()}</div>
      </div>

      <ProjectNavigation />
    </div>
  );
};
