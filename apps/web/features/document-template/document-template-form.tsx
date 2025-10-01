'use client';

import { useCategoryTemplates } from '@/features/category-template/use-category-templates';
import { useDomains } from '@/features/domain/use-domains';
import { useI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import type { DocumentTemplate } from '@repo/database/schema';
import { insertDocumentTemplateSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = insertDocumentTemplateSchema.extend({});

export const DocumentTemplateForm = ({
  item,
  onSubmit,
  disabled = false
}: {
  item?: DocumentTemplate;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  disabled?: boolean;
}) => {
  const t = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const domainsQuery = useDomains();
  const categoryTemplatesQuery = useCategoryTemplates();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...item,
      domainId: item?.domainId || domainsQuery.data?.[0]?.id || '',
      name: item?.name || '',
      isRequired: item?.isRequired ?? true,
      mimeWhitelist: item?.mimeWhitelist || '',
      exampleUrl: item?.exampleUrl || '',
      tags: item?.tags || ''
    }
  });

  const submit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await onSubmit(values);
    form.reset(values);
    setIsLoading(false);
  };

  const { isDirty } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='space-y-8'>
        <div className='space-y-3'>
          <div className='flex flex-col gap-3'>
            <FormField
              control={form.control}
              name='domainId'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Domain</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(v) => {
                        field.onChange(v);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select a domain' />
                      </SelectTrigger>
                      <SelectContent>
                        {domainsQuery.data?.map((domain) => (
                          <SelectItem key={domain.id} value={domain.id}>
                            {domain.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>
                    Name <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={'ex: Evaluation report'}
                      {...field}
                      value={field.value || ''}
                      className='w-full'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-col md:flex-row gap-3'>
              <FormField
                control={form.control}
                name='exampleUrl'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Example URL</FormLabel>
                    <FormControl>
                      <Input placeholder={'https://...'} {...field} value={field.value || ''} className='w-full' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='mimeWhitelist'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Mime whitelist</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={'application/pdf,image/png'}
                        className='w-full'
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
