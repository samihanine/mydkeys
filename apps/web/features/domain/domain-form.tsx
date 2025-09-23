'use client';

import { useI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Domain } from '@repo/database/schema';
import { insertDomainSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Textarea } from '@repo/ui/components/textarea';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = insertDomainSchema.extend({});

export const DomainForm = ({
  domain,
  onSubmit,
  disabled = false
}: {
  domain?: Domain;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  disabled?: boolean;
}) => {
  const t = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const submit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await onSubmit(values);
    form.reset(values);
    setIsLoading(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...domain,
      organizationId: domain?.organizationId || '',
      domainKey: domain?.domainKey || '',
      name: domain?.name || '',
      slug: domain?.slug || '',
      version: domain?.version || '1.0.0',
      description: domain?.description || '',
      isDefault: domain?.isDefault || false,
      createdBy: domain?.createdBy || undefined
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
                name='name'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>
                      Name <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={'ex: Healthcare'} {...field} value={field.value || ''} className='w-full' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='slug'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>
                      Slug <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={'ex: healthcare'} {...field} value={field.value || ''} className='w-full' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-col md:flex-row gap-3'>
              <FormField
                control={form.control}
                name='domainKey'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>
                      Key <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={'ex: HEALTHCARE'} {...field} value={field.value || ''} className='w-full' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='version'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>
                      Version <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={'1.0.0'} {...field} value={field.value || ''} className='w-full' />
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
                    <Textarea placeholder={'Description...'} className='w-full' {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='flex flex-col gap-4 md:flex-row'>
          <Button type='button' variant={'outline'} className='flex-1' onClick={() => router.back()}>
            Retour
          </Button>
          {!disabled && (
            <Button type='submit' variant={'default'} className='flex-1 md:flex-[2]' disabled={isLoading || !isDirty}>
              {isLoading ? 'Enregistrement...' : domain ? 'Mettre à jour' : 'Créer'}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
