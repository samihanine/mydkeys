'use client';

import { useCurrentProject } from '../project/use-current-project';
import { useSpecificationTemplates } from '../specification-template/use-specification-templates';
import { useUpsertSpecification } from './use-upsert-specification-page';
import { useI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Specification } from '@repo/database/schema';
import { insertSpecificationSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Form } from '@repo/ui/components/form';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.array(insertSpecificationSchema);

export const SpecificationsForm = ({
  specifications,
  onSubmit,
  onCancel
}: {
  specifications?: Specification[];
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  onCancel: () => void;
}) => {
  const t = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const projectQuery = useCurrentProject();
  const upsertMutation = useUpsertSpecification();
  const specificationTemplatesQuery = useSpecificationTemplates();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: specifications || []
  });

  const submit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await onSubmit(values);
    form.reset(values);
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='space-y-8'>
        <div className='space-y-3'></div>

        <div className='flex flex-col gap-4 md:flex-row md:justify-center'>
          <Button type='button' variant={'outline'} className='flex-1' onClick={onCancel}>
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
