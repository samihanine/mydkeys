'use client';

import { UploadFileInput } from '../file/upload-file-input';
import { useDomains } from '@/features/domain/use-domains';
import { useI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import type { DocumentTemplate } from '@repo/database/schema';
import { insertDocumentTemplateSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { Textarea } from '@repo/ui/components/textarea';
import { EyeIcon, TrashIcon, UploadIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...item,
      domainId: item?.domainId || domainsQuery.data?.[0]?.id || '',
      name: item?.name || '',
      isRequired: item?.isRequired ?? true,
      tags: item?.tags || '',
      description: item?.description || '',
      exampleUrl: item?.exampleUrl || ''
    }
  });

  const submit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await onSubmit(values);
    form.reset(values);
    setIsLoading(false);
  };

  useEffect(() => {
    if (domainsQuery.data?.[0]?.id && !form.getValues('domainId')) {
      form.setValue('domainId', domainsQuery.data?.[0]?.id);
    }
  }, [domainsQuery.data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='space-y-8'>
        <div className='space-y-3'>
          <div className='flex flex-col gap-3'>
            <FormField
              control={form.control}
              name='domainId'
              render={({ field }) => (
                <FormItem className='col-span-2 hidden'>
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
                    Titre <span className='text-red-500'>*</span>
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

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={'ex: This document is used to store evaluation reports'}
                      {...field}
                      value={field.value || ''}
                      className='w-full'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='exampleUrl'
              render={({ field }) => (
                <div className='flex flex-col gap-2'>
                  <Label>Document exemple</Label>

                  <div className='flex gap-2'>
                    {!field.value?.length && (
                      <Button
                        variant='secondary'
                        size='sm'
                        className='flex-1'
                        onClick={() => inputRef.current?.click()}
                        type='button'
                      >
                        <UploadIcon className='h-4 w-4' />
                        Téléverser un document exemple
                      </Button>
                    )}

                    {!!field.value?.length && (
                      <Button
                        variant='secondary'
                        size='sm'
                        className='flex-1'
                        onClick={() => {
                          window.open(process.env.NEXT_PUBLIC_FILE_ENDPOINT + '/' + field.value, '_blank');
                        }}
                        type='button'
                      >
                        <EyeIcon className='h-4 w-4' />
                        Voir le document exemple
                      </Button>
                    )}
                    <UploadFileInput
                      ref={inputRef}
                      className='hidden'
                      setId={async (fileId) => {
                        field.onChange(fileId);
                      }}
                    />

                    {!!field.value?.length && (
                      <Button
                        variant='outline'
                        size='sm'
                        className='flex-1'
                        onClick={() => {
                          field.onChange(undefined);
                        }}
                        type='button'
                      >
                        <TrashIcon className='h-4 w-4' />
                        Supprimer le document exemple
                      </Button>
                    )}
                  </div>
                </div>
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
