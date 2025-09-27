'use client';

import { useMemberTemplates } from '../member-template/use-member-templates';
import { useI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Project } from '@repo/database/schema';
import { insertProjectSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import { Checkbox } from '@repo/ui/components/checkbox';
import { Form } from '@repo/ui/components/form';
import { cn, getIcon } from '@repo/ui/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = insertProjectSchema;

export const SeletedMemberTemplatesForm = ({
  project,
  onSubmit,
  onCancel
}: {
  project?: Project;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  onCancel: () => void;
}) => {
  const t = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const memberTemplatesQuery = useMemberTemplates();

  const submit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await onSubmit(values);
    form.reset(values);
    setIsLoading(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...project,
      selectedMemberTemplateIds: project?.selectedMemberTemplateIds || []
    }
  });

  const selectedIds = (form.watch('selectedMemberTemplateIds') || []) as string[];
  const toggleTemplate = (id: string, checked: boolean) => {
    const set = new Set(selectedIds);
    if (checked) set.add(id);
    else set.delete(id);
    form.setValue('selectedMemberTemplateIds', Array.from(set), { shouldDirty: true, shouldTouch: true });
  };

  useEffect(() => {
    if (project) {
      form.reset({ ...project, selectedMemberTemplateIds: project.selectedMemberTemplateIds || [] });
    }
  }, [project]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='space-y-8'>
        <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {memberTemplatesQuery.data
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map((memberTemplate) => {
              const Icon = getIcon(memberTemplate.icon);
              const isSelected = selectedIds.includes(memberTemplate.id);
              return (
                <Card
                  key={memberTemplate.id}
                  className={cn(
                    'flex items-center gap-2 cursor-pointer p-4 flex-col justify-center min-h-30',
                    isSelected && 'bg-secondary text-secondary-foreground'
                  )}
                  onClick={() => toggleTemplate(memberTemplate.id, !isSelected)}
                >
                  <Icon className='size-8' />
                  <span className='text-base font-medium text-center'>{memberTemplate.name}</span>
                </Card>
              );
            })}
        </div>
        <div className='flex flex-col gap-4 md:flex-row md:justify-center'>
          <Button type='button' variant={'outline'} className='flex-1' onClick={() => router.back()}>
            {t('common.cancel')}
          </Button>
          <Button
            type='submit'
            variant={'default'}
            className='flex-1 md:flex-[2]'
            disabled={isLoading || !form.formState.isDirty}
          >
            {isLoading ? t('common.loading') : t('common.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
