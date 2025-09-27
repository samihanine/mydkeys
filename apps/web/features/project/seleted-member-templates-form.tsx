'use client';

import { useMemberTemplates } from '../member-template/use-member-templates';
import { useI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Project } from '@repo/database/schema';
import { insertProjectSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Checkbox } from '@repo/ui/components/checkbox';
import { Form } from '@repo/ui/components/form';
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
        <div className='space-y-6'>
          {memberTemplatesQuery.data?.map((memberTemplate) => (
            <label key={memberTemplate.id} className='flex items-center gap-2'>
              <Checkbox
                checked={selectedIds.includes(memberTemplate.id)}
                onCheckedChange={(v) => toggleTemplate(memberTemplate.id, !!v)}
              />
              <span>{memberTemplate.name}</span>
            </label>
          ))}
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
