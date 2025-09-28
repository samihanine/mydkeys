'use client';

import { useCurrentProject } from './use-current-project';
import { ProjectForm } from '@/features/project/project-form';
import { useDeleteProject } from '@/features/project/use-delete-project';
import { useProjectById } from '@/features/project/use-project-by-id';
import { useUpdateProject } from '@/features/project/use-update-project';
import { orpc } from '@/lib/orpc';
import { useI18n } from '@/locales/client';
import { Button } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@repo/ui/components/dialog';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H2, P } from '@repo/ui/components/typography';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const UpdateCurrentProjectPage = () => {
  const t = useI18n();
  const currentProjectQuery = useCurrentProject();
  const updateProjectMutation = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();

  if (currentProjectQuery.isFetching || !currentProjectQuery.data) {
    return (
      <div className='flex h-full items-center justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!currentProjectQuery.data) {
    return <div>{t('project.notFound')}</div>;
  }

  const handleDeleteProject = async () => {
    await deleteProjectMutation.mutateAsync({ id: currentProjectQuery.data.id });
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className='flex flex-col pb-8'>
      <H2 className='mb-0'>{t('project.updateCurrentTitle')}</H2>
      <Card className='p-6 shadow-none mt-5'>
        <ProjectForm
          onCancel={() => {
            router.back();
          }}
          project={currentProjectQuery.data}
          onSubmit={async (values) => {
            await updateProjectMutation.mutateAsync({ ...values, id: currentProjectQuery.data.id });
            await queryClient.invalidateQueries(orpc.project.getCurrentProject.queryOptions());
            await queryClient.invalidateQueries(orpc.project.getAll.queryOptions());
          }}
        />
      </Card>
      <H2 className='mb-0 mt-8'>{t('project.dangerZone.title')}</H2>
      <Card className='p-6 shadow-none mt-5'>
        <P className='text-muted-foreground'>{t('project.dangerZone.description')}</P>
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button variant='destructive' className='w-fit px-10'>
              {t('project.dangerZone.deleteButton')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('project.dangerZone.confirmTitle')}</DialogTitle>
              <DialogDescription>{t('project.dangerZone.confirmDescription')}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={deleteProjectMutation.isPending}
              >
                {t('project.dangerZone.cancelButton')}
              </Button>
              <Button variant='destructive' onClick={handleDeleteProject} disabled={deleteProjectMutation.isPending}>
                {deleteProjectMutation.isPending
                  ? t('project.dangerZone.deleting')
                  : t('project.dangerZone.deleteForever')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
};
