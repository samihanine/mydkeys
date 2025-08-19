'use client';

import { ProjectAvatar } from './project-avatar';
import { UploadFileInput } from '@/components/upload-file-input';
import { useI18n } from '@/locales/client';
import { AtSymbolIcon, CheckCircleIcon, HomeIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Project } from '@repo/database/schema';
import { insertProjectSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { Textarea } from '@repo/ui/components/textarea';
import { H4 } from '@repo/ui/components/typography';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = insertProjectSchema;

export const ProjectForm = ({
  project,
  onSubmit
}: {
  project?: Project;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
}) => {
  const t = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const submit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await onSubmit(values);
    form.reset(values);
    setIsLoading(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: project?.name || '',
      imageFileId: project?.imageFileId || '',
      projectTemplateId: project?.projectTemplateId || '',
      status: project?.status || 'ACTIVE'
    }
  });

  const { isDirty } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='space-y-8'>
        <div className='space-y-6'>
          <ProjectAvatar size='xl' project={form.getValues() as Project} />

          <FormField
            control={form.control}
            name='imageFileId'
            render={({ field }) => (
              <FormItem className='text-center'>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <UploadFileInput accept='image/*' setKey={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('project.form.fields.name')} <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    Icon={UserIcon}
                    placeholder={t('project.form.fields.namePlaceholder')}
                    {...field}
                    className='w-full'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('project.form.fields.description')}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ''}
                    className='min-h-[120px] w-full resize-none rounded-md bg-white p-3'
                    placeholder={t('project.form.fields.descriptionPlaceholder')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-4 md:flex-row md:justify-center'>
          <Button type='button' variant={'outline'} className='flex-1' onClick={() => router.back()}>
            {t('project.form.buttons.goBack')}
          </Button>
          <Button type='submit' variant={'default'} className='flex-1 md:flex-[2]' disabled={isLoading || !isDirty}>
            <CheckCircleIcon className='mr-1 h-4 w-4' />
            {isLoading
              ? t('project.form.buttons.saving')
              : project
                ? t('project.form.buttons.update')
                : t('project.form.buttons.create')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
