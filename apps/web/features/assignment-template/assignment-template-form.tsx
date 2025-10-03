'use client';

import { useDocumentTemplates } from '../document-template/use-document-templates';
import { useGroupTemplates } from '../group-template/use-group-templates';
import { useAssignmentTemplates } from './use-assignment-templates';
import { usePermissionOptions } from '@/features/assignment/use-permission-options';
import { useI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { AssignmentTemplate, insertAssignmentTemplateSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const AssignmentTemplateForm = ({
  assignmentTemplate,
  onSubmit,
  groupTemplateId,
  documentTemplateId,
  onCancel,
  domainId
}: {
  assignmentTemplate?: Partial<AssignmentTemplate>;
  onSubmit: (values: z.infer<typeof insertAssignmentTemplateSchema>) => Promise<void>;
  groupTemplateId?: string;
  documentTemplateId?: string;
  onCancel?: () => void;
  domainId: string;
}) => {
  const t = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const groupTemplatesQuery = useGroupTemplates();
  const documentTemplatesQuery = useDocumentTemplates();
  const assignmentTemplatesQuery = useAssignmentTemplates();
  const permissionOptions = usePermissionOptions();

  const groupTemplates =
    groupTemplatesQuery.data?.filter((groupTemplate) => {
      let isAllowed = true;
      if (documentTemplateId) {
        isAllowed = !assignmentTemplatesQuery.data?.some(
          (assignmentTemplate) =>
            assignmentTemplate.groupTemplateId === groupTemplate.id &&
            assignmentTemplate.documentTemplateId === documentTemplateId
        );
      }

      if (assignmentTemplate) {
        isAllowed = groupTemplate.id === assignmentTemplate.groupTemplateId;
      }

      return isAllowed;
    }) || [];

  const documentTemplates =
    documentTemplatesQuery.data?.filter((documentTemplate) => {
      let isAllowed = true;
      if (groupTemplateId) {
        isAllowed = !assignmentTemplatesQuery.data?.some(
          (assignmentTemplate) =>
            assignmentTemplate.documentTemplateId === documentTemplate.id &&
            assignmentTemplate.groupTemplateId === groupTemplateId
        );
      }

      if (assignmentTemplate) {
        isAllowed = documentTemplate.id === assignmentTemplate.documentTemplateId;
      }

      return isAllowed;
    }) || [];

  const form = useForm<z.infer<typeof insertAssignmentTemplateSchema>>({
    resolver: zodResolver(insertAssignmentTemplateSchema),
    defaultValues: {
      groupTemplateId: assignmentTemplate?.groupTemplateId || groupTemplateId,
      documentTemplateId: assignmentTemplate?.documentTemplateId || documentTemplateId,
      permission: assignmentTemplate?.permission || 'VIEW',
      domainId: assignmentTemplate?.domainId || domainId
    }
  });

  const submit = async (values: z.infer<typeof insertAssignmentTemplateSchema>) => {
    setIsLoading(true);
    await onSubmit(values);
    setIsLoading(false);
  };

  useEffect(() => {
    if (assignmentTemplate) {
      form.setValue('groupTemplateId', assignmentTemplate.groupTemplateId!);
      form.setValue('documentTemplateId', assignmentTemplate.documentTemplateId!);
      form.setValue('permission', assignmentTemplate.permission!);
    }
  }, [assignmentTemplate]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='space-y-8'>
        <div className='space-y-3'>
          {!groupTemplateId && (
            <FormField
              control={form.control}
              name='groupTemplateId'
              disabled={!!assignmentTemplate?.groupTemplateId}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('assignment.form.fields.group')}</FormLabel>
                  <Select
                    onValueChange={(v) => {
                      field.onChange(v);
                    }}
                    value={field.value || undefined}
                    defaultValue={field.value}
                    disabled={!groupTemplates.length}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder={t('assignment.form.fields.groupPlaceholder')}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {groupTemplates.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {!documentTemplateId && (
            <FormField
              control={form.control}
              name='documentTemplateId'
              disabled={!documentTemplates.length || !!assignmentTemplate?.documentTemplateId}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('assignment.form.fields.document')}</FormLabel>
                  <Select
                    onValueChange={(v) => {
                      field.onChange(v);
                    }}
                    value={field.value || undefined}
                    defaultValue={field.value || undefined}
                    disabled={!documentTemplates.length}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value || undefined}
                          placeholder={t('assignment.form.fields.documentPlaceholder')}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {documentTemplates.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name='permission'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('assignment.form.fields.permission')}</FormLabel>
                <Select
                  onValueChange={(v) => {
                    field.onChange(v);
                  }}
                  value={field.value || undefined}
                  defaultValue={field.value || undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value || undefined}
                        placeholder={t('assignment.form.fields.permissionPlaceholder')}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {permissionOptions.map((option) => (
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
