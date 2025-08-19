'use client';

import { useDocumentTypeOptions } from './use-document-type-options';
import { FilePreview } from '@/components/file-preview';
import { UploadFileInput } from '@/components/upload-file-input';
import { useCurrentUser } from '@/features/auth/use-current-user';
import { useCurrentMember } from '@/features/stakeholder/use-current-stakeholder';
import { useMembers } from '@/features/stakeholder/use-members';
import { useI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Document } from '@repo/database/schema';
import { insertDocumentSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
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
  const typeOptions = useDocumentTypeOptions();
  const currentMemberQuery = useCurrentMember();
  const membersQuery = useMembers();

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
      type: document?.type || 'EVALUATION_REPORT',
      timestamp: document?.timestamp || new Date().toISOString(),
      description: document?.description || '',
      title: document?.title || '',
      profileId: currentUserQuery.data?.selectedProfileId || undefined,
      memberId: currentMemberQuery.data?.id || undefined
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
                name='title'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>
                      {t('document.form.fields.title')} <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t('document.form.fields.titlePlaceholder')} {...field} className='w-full' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>
                      {t('document.form.fields.type')} <span className='text-red-500'>*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value || 'PRESCRIPTION'}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('document.form.fields.typePlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {typeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='timestamp'
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
              name='description'
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {!document && (
            <FormField
              control={form.control}
              name='path'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('document.form.fields.file')} <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <UploadFileInput setKey={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {form.watch('path') && (
            <div className='flex flex-col gap-3'>
              <div className='mb-2 flex justify-center'>
                <FilePreview fileKey={form.watch('path')} title={form.watch('title')} />
              </div>
            </div>
          )}
        </div>
        <div className='flex flex-col gap-4 md:flex-row'>
          <Button type='button' variant={'outline'} className='flex-1' onClick={() => router.back()}>
            {t('document.form.buttons.goBack')}
          </Button>
          {!disabled && (
            <Button type='submit' variant={'default'} className='flex-1 md:flex-[2]' disabled={isLoading || !isDirty}>
              {isLoading
                ? t('document.form.buttons.saving')
                : document
                  ? t('document.form.buttons.update')
                  : t('document.form.buttons.create')}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
