'use client';

import { useDomains } from '../domain/use-domains';
import { zodResolver } from '@hookform/resolvers/zod';
import type { MemberTemplate } from '@repo/database/schema';
import { insertMemberTemplateSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = insertMemberTemplateSchema.extend({});

export const MemberTemplateForm = ({
  item,
  onSubmit,
  disabled = false
}: {
  item?: MemberTemplate;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  disabled?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const domainsQuery = useDomains();

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
      domainId: item?.domainId || domainsQuery.data?.[0]?.id,
      name: item?.name || '',
      slug: item?.slug || '',
      kind: item?.kind || 'PERSON',
      isRequired: item?.isRequired ?? false,
      maxCount: item?.maxCount || undefined,
      permissionsDefault: item?.permissionsDefault || []
    }
  });

  const { isDirty } = form.formState;

  useEffect(() => {
    if (domainsQuery.data?.[0]?.id && !form.getValues('domainId')) {
      form.setValue('domainId', domainsQuery.data[0].id);
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
              <FormField
                control={form.control}
                name='slug'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>
                      Slug <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={'ex: parent'} {...field} value={field.value || ''} className='w-full' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
              name='isRequired'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>Required</FormLabel>
                  <FormControl>
                    <Input type='checkbox' checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />
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
              {isLoading ? 'Enregistrement...' : item ? 'Mettre à jour' : 'Créer'}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
