'use client';

import { useRoleTypeOptions } from './use-role-type-options';
import { useI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Member, insertMemberSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const MemberForm = ({
  member,
  onSubmit
}: {
  member?: Member;
  onSubmit: (values: z.infer<typeof insertMemberSchema>) => Promise<void>;
}) => {
  const t = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const roleTypeOptions = useRoleTypeOptions();

  const form = useForm<z.infer<typeof insertMemberSchema>>({
    resolver: zodResolver(insertMemberSchema),
    defaultValues: {
      displayName: member?.displayName || '',
      externalEmail: member?.externalEmail || '',
      imageFileId: member?.imageFileId || '',
      metaJson: member?.metaJson || {},
      projectId: member?.projectId || '',
      memberTemplateId: member?.memberTemplateId || '',
      userId: member?.userId || '',
      kind: member?.kind || 'PERSON'
    }
  });

  const submit = async (values: z.infer<typeof insertMemberSchema>) => {
    setIsLoading(true);
    await onSubmit(values);
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='space-y-8'>
        <div className='space-y-3'>
          <FormField
            control={form.control}
            name='displayName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('member.form.fields.title')}</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ''} placeholder={t('member.form.fields.titlePlaceholder')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='kind'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('member.form.fields.relation')}</FormLabel>
                <Select
                  onValueChange={(v) => {
                    field.onChange(v);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('member.form.fields.relationPlaceholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roleTypeOptions.map((option) => (
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

          <FormField
            control={form.control}
            name='externalEmail'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('member.form.fields.firstName')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='email'
                    placeholder={t('member.form.fields.firstNamePlaceholder')}
                    value={field.value || ''}
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
