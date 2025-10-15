'use client';

import { useCurrentProject } from '../project/use-current-project';
import { useI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Group, insertGroupSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Checkbox } from '@repo/ui/components/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const GroupForm = ({
  group,
  onSubmit
}: {
  group?: Partial<Group>;
  onSubmit: (values: z.infer<typeof insertGroupSchema>) => Promise<void>;
}) => {
  const t = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const currentProjectQuery = useCurrentProject();

  const form = useForm<z.infer<typeof insertGroupSchema>>({
    resolver: zodResolver(insertGroupSchema),
    defaultValues: {
      name: group?.name || '',
      description: group?.description || '',
      isAdministrator: group?.isAdministrator || false,
      projectId: group?.projectId || currentProjectQuery.data?.id,
      groupTemplateId: group?.groupTemplateId,
      hexColor: group?.hexColor || '#1C90CD'
    }
  });

  const submit = async (values: z.infer<typeof insertGroupSchema>) => {
    setIsLoading(true);
    await onSubmit(values);
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='space-y-8'>
        <div className='space-y-3'>
          <div className='flex gap-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>{t('group.form.fields.name')}</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} placeholder={t('group.form.fields.namePlaceholder')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='hexColor'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>Couleur</FormLabel>
                  <FormControl>
                    <Input
                      type='color'
                      value={field.value || '#1C90CD'}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>{t('group.form.fields.description')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ''}
                    placeholder={t('group.form.fields.descriptionPlaceholder')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
