'use client';

import { useDomains } from '../domain/use-domains';
import { useCurrentProject } from '../project/use-current-project';
import { useI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Category } from '@repo/database/schema';
import { insertCategorySchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = insertCategorySchema.extend({});

export const CategoryForm = ({
  item,
  onSubmit
}: {
  item?: Category;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const domainsQuery = useDomains();
  const projectQuery = useCurrentProject();
  const t = useI18n();

  const submit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await onSubmit(values);
    form.reset(values);
    setIsLoading(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...item,
      projectId: item?.projectId || projectQuery.data?.id,
      name: item?.name || '',
      hexColor: item?.hexColor || '#7cce00'
    }
  });

  useEffect(() => {
    if (projectQuery.data?.id && !form.getValues('projectId')) {
      form.setValue('projectId', projectQuery.data.id);
    }
  }, [domainsQuery.data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='space-y-8'>
        <div className='space-y-3'>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col md:flex-row gap-3'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>
                      Name <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={'ex: Parent'} {...field} value={field.value || ''} className='w-full' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='hexColor'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Hex Color</FormLabel>
                  <FormControl>
                    <Input
                      type='color'
                      value={field.value || '#7cce00'}
                      onChange={(e) => field.onChange(e.target.value)}
                      className='w-full'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
