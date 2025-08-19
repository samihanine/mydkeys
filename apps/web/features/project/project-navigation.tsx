import { ProjectAvatar } from './project-avatar';
import { useCurrentProject } from './use-current-project';
import { useProjects } from './use-projects';
import { useSelectProject } from './use-select-project';
import { useI18n } from '@/locales/client';
import { Button } from '@repo/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@repo/ui/components/dropdown-menu';
import { useIsMobile } from '@repo/ui/hooks/use-is-mobile';
import { Check, ChevronsUpDown, LogOut, User } from 'lucide-react';
import Link from 'next/link';

export const ProjectNavigation = () => {
  const t = useI18n();
  const projectsQuery = useProjects();
  const currentProjectQuery = useCurrentProject();
  const isMobile = useIsMobile();
  const projectSelectMutation = useSelectProject();

  if (!projectsQuery.data || !currentProjectQuery.data || projectSelectMutation.isPending) {
    return null;
  }

  const currentProject = currentProjectQuery.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          type='button'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full px-0'
        >
          <ProjectAvatar project={currentProject} />
          <div className='ml-1 grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>
              {currentProject.firstName} {currentProject.lastName}
            </span>
          </div>
          <ChevronsUpDown className='ml-auto size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
        side={isMobile ? 'bottom' : 'right'}
        align='end'
        sideOffset={4}
      >
        <DropdownMenuLabel className='p-0 font-normal'>
          {projectsQuery.data.map((project) => (
            <DropdownMenuItem
              key={project.id}
              className='w-full cursor-pointer'
              onClick={() => projectSelectMutation.mutate({ id: project.id })}
            >
              <div className='flex w-full items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <ProjectAvatar project={project} />
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {project.firstName} {project.lastName}
                  </span>
                </div>

                {project.id === currentProject.id && <Check className='text-primary ml-auto size-4' />}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <Link href='/projects'>
          <DropdownMenuItem>
            <User />
            {t('project.manageProjects')}
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
