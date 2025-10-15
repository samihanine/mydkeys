'use client';

import { useGroupsByCurrentProject } from '../group/use-groups-by-current-project';
import { useCurrentProject } from '../project/use-current-project';
import { useI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Member, insertMemberSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Card, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { MultiSelect } from '@repo/ui/components/multi-select';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = insertMemberSchema.extend({
  groupIds: z.array(z.string())
});

export const MemberForm = ({
  member,
  groupIds,
  onSubmit,
  isLoading = false
}: {
  member?: Partial<Member>;
  onSubmit: (values: z.infer<typeof schema>) => Promise<void>;
  groupIds?: string[];
  isLoading?: boolean;
}) => {
  const t = useI18n();
  const router = useRouter();
  const currentProjectQuery = useCurrentProject();
  const groupsQuery = useGroupsByCurrentProject();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      displayName: member?.displayName || '',
      externalEmail: member?.externalEmail || '',
      imageFileId: member?.imageFileId || null,
      metaJson: member?.metaJson || {},
      projectId: member?.projectId || currentProjectQuery.data?.id || '',
      userId: member?.userId || null,
      kind: member?.kind || 'PERSON',
      title: member?.title || null,
      groupIds: groupIds || [],
      isAdministrator: member?.isAdministrator || false
    }
  });

  const submit = async (values: z.infer<typeof schema>) => {
    await onSubmit(values);
  };

  useEffect(() => {
    if (groupIds) {
      form.setValue('groupIds', groupIds);
    }
  }, [groupIds]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='space-y-8'>
        <div className='space-y-3'>
          <div className='flex gap-3'>
            <FormField
              control={form.control}
              name='displayName'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>{t('member.form.fields.displayName')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ''}
                      placeholder={t('member.form.fields.displayNamePlaceholder')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>{t('member.form.fields.title')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ''}
                      placeholder={t('member.form.fields.titlePlaceholder')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='externalEmail'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('member.form.fields.email')}</FormLabel>
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
          {!member?.isAdministrator && (
            <FormField
              control={form.control}
              name='groupIds'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Équipes</FormLabel>
                  <FormControl>
                    <MultiSelect
                      placeholder='Sélectionner des équipes'
                      options={
                        groupsQuery.data?.map((group) => ({
                          label: group.name,
                          value: group.id,
                          color: group.hexColor
                        })) || []
                      }
                      onValueChange={field.onChange}
                      defaultValue={field.value || []}
                      key={field.value.join(',')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {member?.isAdministrator && (
            <Input
              className='bg-yellow-50 border-yellow-600 text-yellow-600 font-bold'
              disabled
              value='Administrateur (toutes les permissions)'
            />
          )}
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
