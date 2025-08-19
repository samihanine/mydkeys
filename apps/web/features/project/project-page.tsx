'use client';

import { ProjectAvatar } from './project-avatar';
import { useCurrentProject } from '@/features/project/use-current-project';
import { useProjects } from '@/features/project/use-projects';
import { useSelectProject } from '@/features/project/use-select-project';
import { useI18n } from '@/locales/client';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar';
import { Button } from '@repo/ui/components/button';
import { Card, CardFooter, CardHeader } from '@repo/ui/components/card';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { cn } from '@repo/ui/lib/utils';
import { PlusIcon, UserCheckIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const ProjectsPage = () => {
  const t = useI18n();
  const projectsQuery = useProjects();
  const selectProjectMutation = useSelectProject();
  const currentProjectQuery = useCurrentProject();
  const router = useRouter();

  if (projectsQuery.isFetching) {
    return (
      <div className='flex items-center justify-center h-full'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='w-full h-full'>
      <h1 className='mb-6 text-3xl font-bold'>{t('project.title')}</h1>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full'>
        {projectsQuery.data
          ?.sort((a, b) => a.firstName.localeCompare(b.firstName))
          .map((project) => (
            <Card
              key={project.id}
              className={cn(
                'flex flex-col',
                project.id === currentProjectQuery.data?.id && 'border-[#BDE1E5] bg-[#F5FAFA]'
              )}
            >
              <CardHeader className='flex flex-col items-center gap-4 pb-2'>
                <div className=''>
                  <ProjectAvatar size='xl' project={project} />
                </div>
                <div>
                  <h3 className='text-xl font-semibold'>
                    {project.gender === 'male'
                      ? t('project.prefixes.mr')
                      : project.gender === 'female'
                        ? t('project.prefixes.mrs')
                        : ''}
                    {project.firstName} {project.lastName}
                  </h3>
                </div>
              </CardHeader>

              <CardFooter className='mt-auto flex flex-col flex-wrap items-center gap-3 md:flex-row justify-center'>
                {project.id === currentProjectQuery.data?.id && (
                  <Link href={`/dashboard`}>
                    <Button variant='secondary' size='sm' className='text-xs'>
                      <EyeIcon className='mr-1 h-4 w-4' />
                      {t('project.view')}
                    </Button>
                  </Link>
                )}

                {project.id !== currentProjectQuery.data?.id && (
                  <Button
                    variant='default'
                    size='sm'
                    onClick={async () => {
                      await selectProjectMutation.mutateAsync({ id: project.id });

                      router.push('/dashboard');
                    }}
                    className='text-xs'
                    disabled={selectProjectMutation.isPending}
                  >
                    <UserCheckIcon className='mr-1 h-4 w-4' />
                    {selectProjectMutation.isPending ? t('project.selecting') : t('project.selectProject')}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}

        <Link href='/onboarding' className='block h-full w-full flex-1'>
          <Card className='flex h-full cursor-pointer flex-col items-center justify-center transition-colors hover:bg-gray-50'>
            <div className='flex flex-col items-center justify-center py-10'>
              <div className='mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100'>
                <PlusIcon className='h-6 w-6' />
              </div>
              <p className='font-medium'>{t('project.addNewProject')}</p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
};
