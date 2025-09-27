'use client';

import { useDomains } from '@/features/domain/use-domains';
import { useI18n } from '@/locales/client';
import { CheckCircleIcon, UserIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Project } from '@repo/database/schema';
import { insertProjectSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { Textarea } from '@repo/ui/components/textarea';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = insertProjectSchema;

export const ProjectForm = ({
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
  const domainsQuery = useDomains();

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
      imageFileId: project?.imageFileId || null,
      domainId: project?.domainId || domainsQuery.data?.[0]?.id
    }
  });

  useEffect(() => {
    if (domainsQuery.data?.[0]?.id) {
      if (form.getValues('domainId')) {
        return;
      }
      form.setValue('domainId', domainsQuery.data[0].id);
    }
  }, [domainsQuery.data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='space-y-8'>
        <div className='space-y-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('project.form.fields.firstName')} <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    Icon={UserIcon}
                    placeholder={t('project.form.fields.firstNamePlaceholder')}
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
            name='domainId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('project.form.fields.domain')}</FormLabel>
                <Select
                  onValueChange={(v) => {
                    field.onChange(v);
                  }}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder={t('project.form.fields.domainPlaceholder')}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {domainsQuery.data?.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
