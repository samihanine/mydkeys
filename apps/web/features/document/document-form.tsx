'use client';

import { useCurrentUser } from '@/features/auth/use-current-user';
import { useI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Document } from '@repo/database/schema';
import { insertDocumentSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Textarea } from '@repo/ui/components/textarea';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = insertDocumentSchema.extend({});

export const DocumentForm = ({
  document,
  onSubmit,
  disabled = false
}: {
  document?: Document;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  disabled?: boolean;
}) => {
  const t = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const currentUserQuery = useCurrentUser();

  const submit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await onSubmit(values);
    form.reset(values);
    setIsLoading(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...document,
      documentTemplateId: document?.documentTemplateId || '',
      memberId: document?.memberId || '',
      fileId: document?.fileId || undefined,
      uploadedBy: document?.uploadedBy || '',
      uploadedAt: document?.uploadedAt || new Date().toISOString(),
      notes: document?.notes || '',
      projectId: currentUserQuery.data?.selectedProjectId || undefined
    }
  });

  const { isDirty } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='space-y-8'>
        <div className='space-y-3'>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col md:flex-row gap-3'>
              <FormField
                control={form.control}
                name='documentTemplateId'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>
                      {t('document.form.fields.type')} <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('document.form.fields.typePlaceholder')}
                        {...field}
                        value={field.value || ''}
                        className='w-full'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='uploadedAt'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('document.form.fields.documentDate')} <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='datetime-local'
                      value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          field.onChange(new Date(e.target.value).toISOString());
                        }
                      }}
                      className='w-full'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='notes'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>
                    {t('document.form.fields.description')} <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('document.form.fields.descriptionPlaceholder')}
                      className='w-full'
                      {...field}
                      value={field.value || ''}
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
