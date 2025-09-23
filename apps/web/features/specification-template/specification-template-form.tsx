'use client';

import { useDomains } from '../domain/use-domains';
import { useI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SpecificationTemplate } from '@repo/database/schema';
import { insertSpecificationTemplateSchema, specificationTemplateTypeEnum } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { Textarea } from '@repo/ui/components/textarea';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = insertSpecificationTemplateSchema.extend({});

export const SpecificationTemplateForm = ({
  item,
  onSubmit,
  disabled = false
}: {
  item?: SpecificationTemplate;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  disabled?: boolean;
}) => {
  const t = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const domainsQuery = useDomains();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...item,
      domainId: item?.domainId || domainsQuery.data?.[0]?.id || '',
      key: item?.key || '',
      name: item?.name || '',
      description: item?.description || '',
      type: item?.type || specificationTemplateTypeEnum.enumValues[0],
      isRequired: item?.isRequired ?? false,
      options: item?.options || ''
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
                      <Input className='w-full' {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='key'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>
                      Key <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input className='w-full' {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-col md:flex-row gap-3'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>
                      Type <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={(v) => field.onChange(v)}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a type' />
                        </SelectTrigger>
                        <SelectContent>
                          {specificationTemplateTypeEnum.enumValues.map((value) => (
                            <SelectItem key={value} value={value}>
                              {value}
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
                name='domainId'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Domain</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={(v) => field.onChange(v)}>
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
            </div>

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className='w-full' {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='options'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Options</FormLabel>
                  <FormControl>
                    <Textarea className='w-full' {...field} value={field.value || ''} />
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
