'use client';

import { useRoleTypeOptions } from './use-role-type-options';
import { useI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stakeholder, insertStakeholderSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const StakeholderForm = ({
  stakeholder,
  onSubmit
}: {
  stakeholder?: Stakeholder;
  onSubmit: (values: z.infer<typeof insertStakeholderSchema>) => Promise<void>;
}) => {
  const t = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const roleTypeOptions = useRoleTypeOptions();

  const form = useForm<z.infer<typeof insertStakeholderSchema>>({
    resolver: zodResolver(insertStakeholderSchema),
    defaultValues: {
      displayName: stakeholder?.displayName || '',
      externalEmail: stakeholder?.externalEmail || '',
      imageFileId: stakeholder?.imageFileId || '',
      metaJson: stakeholder?.metaJson || {},
      projectId: stakeholder?.projectId || '',
      stakeholderTemplateId: stakeholder?.stakeholderTemplateId || '',
      userId: stakeholder?.userId || '',
      kind: stakeholder?.kind || 'PERSON'
    }
  });

  const submit = async (values: z.infer<typeof insertStakeholderSchema>) => {
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
                <FormLabel>{t('stakeholder.form.fields.title')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ''}
                    placeholder={t('stakeholder.form.fields.titlePlaceholder')}
                  />
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
                <FormLabel>{t('stakeholder.form.fields.relation')}</FormLabel>
                <Select
                  onValueChange={(v) => {
                    field.onChange(v);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('stakeholder.form.fields.relationPlaceholder')} />
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
                <FormLabel>{t('stakeholder.form.fields.firstName')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='email'
                    placeholder={t('stakeholder.form.fields.firstNamePlaceholder')}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex gap-2 flex-col md:flex-row'>
          <Button type='button' variant='outline' className='w-full md:flex-1' onClick={() => router.back()}>
            {t('stakeholder.form.buttons.cancel')}
          </Button>
          <Button type='submit' className='w-full md:flex-[2]' disabled={isLoading}>
            {isLoading ? t('stakeholder.form.buttons.sending') : t('stakeholder.form.buttons.save')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
