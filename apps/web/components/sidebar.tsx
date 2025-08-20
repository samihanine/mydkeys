import { ProjectAvatar } from '../features/project/project-avatar';
import { ProjectNavigation } from '../features/project/project-navigation';
import { useCurrentProject } from '../features/project/use-current-project';
import { useCurrentUser } from '@/features/auth/use-current-user';
import { useCurrentStakeholder } from '@/features/stakeholder/use-current-stakeholder';
import { useI18n } from '@/locales/client';
import {
  Bars3Icon,
  ChatBubbleBottomCenterTextIcon as ChatBubbleBottomCenterTextIconOutline,
  ClipboardDocumentListIcon as ClipboardDocumentListIconOutline,
  Cog6ToothIcon as Cog6ToothIconOutline,
  DocumentTextIcon as DocumentTextIconOutline,
  FlagIcon as FlagIconOutline,
  HomeIcon as HomeIconOutline,
  PuzzlePieceIcon as PuzzlePieceIconOutline,
  UserGroupIcon as UserGroupIconOutline,
  XMarkIcon
} from '@heroicons/react/24/outline';
import {
  ChatBubbleBottomCenterTextIcon as ChatBubbleBottomCenterTextIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  FlagIcon as FlagIconSolid,
  HomeIcon as HomeIconSolid,
  PuzzlePieceIcon as PuzzlePieceIconSolid,
  UserGroupIcon as UserGroupIconSolid
} from '@heroicons/react/24/solid';
import { Logo } from '@repo/ui/components/logo';
import { H4 } from '@repo/ui/components/typography';
import { useIsMobile } from '@repo/ui/hooks/use-is-mobile';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useMemo, useState } from 'react';

type MenuItem = {
  name: string;
  href: string;
  icon: ReactNode | ((isActive: boolean) => ReactNode);
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
  const userQuery = useCurrentUser();
  const currentStakeholderQuery = useCurrentStakeholder();

  const menuSections: MenuSection[] = useMemo(() => {
    let sections: MenuSection[] = [
      {
        title: t('sidebar.sections.general'),
        items: [
          {
            name: t('sidebar.items.dashboard'),
            href: '/dashboard',
            icon: (isActive: boolean) =>
              isActive ? (
                <HomeIconSolid className='text-primary h-5 w-5' />
              ) : (
                <HomeIconOutline className='text-primary h-5 w-5' />
              )
          }
        ]
      },
      {
        title: t('sidebar.sections.project'),
        items: [
          {
            name: t('sidebar.items.documents'),
            href: '/documents',
            icon: (isActive: boolean) =>
              isActive ? (
                <DocumentTextIconSolid className='text-primary h-5 w-5' />
              ) : (
                <DocumentTextIconOutline className='text-primary h-5 w-5' />
              )
          }
        ]
      },
      {
        title: t('sidebar.sections.settings'),
        items: [
          {
            name: t('sidebar.items.stakeholders'),
            href: '/stakeholders',
            icon: (isActive: boolean) =>
              isActive ? (
                <UserGroupIconSolid className='text-primary h-5 w-5' />
              ) : (
                <UserGroupIconOutline className='text-primary h-5 w-5' />
              )
          },
          {
            name: t('sidebar.items.settings'),
            href: '/settings',
            icon: (isActive: boolean) =>
              isActive ? (
                <Cog6ToothIconSolid className='text-primary h-5 w-5' />
              ) : (
                <Cog6ToothIconOutline className='text-primary h-5 w-5' />
              )
          }
        ]
      }
    ];

    return sections;
  }, [userQuery.data?.role, currentStakeholderQuery.data]);

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
      {!isMobile && (
        <Link href='/dashboard' className='flex w-full items-center justify-center gap-4'>
          <Image src='/logo-text.png' alt='MyDkeys' width={100} height={100} />
        </Link>
      )}

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
                      'hover:border-border flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 hover:border hover:bg-white hover:shadow-sm',
                      isActive && 'border-border border bg-white shadow-sm'
                    )}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => isMobile && setIsMobileMenuOpen(false)}
                  >
                    {(typeof item.icon === 'function' ? item.icon(isActive || isHovered) : item.icon) as any}
                    <span className='text-sm font-medium text-foreground'>{item.name}</span>
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
                        'hover:border-border flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 hover:border hover:bg-white hover:shadow-sm',
                        isActive && 'border-border border bg-white shadow-sm'
                      )}
                      onMouseEnter={() => setHoveredItem(item.href)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {(typeof item.icon === 'function' ? item.icon(isActive || isHovered) : item.icon) as any}
                      <span className='text-foreground text-sm font-medium'>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectNavigation />
    </div>
  );
};
