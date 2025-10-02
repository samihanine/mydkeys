'use client';

import { useDocumentsByCurrentProject } from '../document/use-documents-by-current-project';
import { useGroupsByCurrentProject } from '../group/use-groups-by-current-project';
import { useCurrentProject } from '../project/use-current-project';
import { useAssignmentsByCurrentProject } from './use-assignments-by-current-project';
import { usePermissionOptions } from './use-permission-options';
import { useI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Assignment, insertAssignmentSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const AssignmentForm = ({
  assignment,
  onSubmit,
  groupId,
  documentId,
  onCancel
}: {
  assignment?: Partial<Assignment>;
  onSubmit: (values: z.infer<typeof insertAssignmentSchema>) => Promise<void>;
  groupId?: string;
  documentId?: string;
  onCancel?: () => void;
}) => {
  const t = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const currentProjectQuery = useCurrentProject();
  const groupsQuery = useGroupsByCurrentProject();
  const documentsQuery = useDocumentsByCurrentProject();
  const assignmentsQuery = useAssignmentsByCurrentProject();
  const permissionOptions = usePermissionOptions();

  const groups =
    groupsQuery.data?.filter(
      (group) =>
        !assignmentsQuery.data?.some(
          (assignment) => assignment.groupId === group.id && assignment.documentId === documentId
        )
    ) || [];

  const documents =
    documentsQuery.data?.filter((document) => {
      let isAllowed = true;
      if (groupId) {
        isAllowed = !assignmentsQuery.data?.some(
          (assignment) => assignment.documentId === document.id && assignment.groupId === groupId
        );
      }

      if (assignment) {
        isAllowed = document.id === assignment.documentId;
      }

      return isAllowed;
    }) || [];

  const form = useForm<z.infer<typeof insertAssignmentSchema>>({
    resolver: zodResolver(insertAssignmentSchema),
    defaultValues: {
      groupId: assignment?.groupId || groupId,
      documentId: assignment?.documentId || documentId,
      permission: assignment?.permission || 'VIEW',
      projectId: assignment?.projectId || currentProjectQuery.data?.id,
      assignmentTemplateId: assignment?.assignmentTemplateId
    }
  });

  const submit = async (values: z.infer<typeof insertAssignmentSchema>) => {
    setIsLoading(true);
    await onSubmit(values);
    setIsLoading(false);
  };

  useEffect(() => {
    if (assignment) {
      form.setValue('groupId', assignment.groupId!);
      form.setValue('documentId', assignment.documentId);
      form.setValue('permission', assignment.permission!);
    }
  }, [assignment]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='space-y-8'>
        <div className='space-y-3'>
          {!groupId && (
            <FormField
              control={form.control}
              name='groupId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('assignment.form.fields.group')}</FormLabel>
                  <Select
                    onValueChange={(v) => {
                      field.onChange(v);
                    }}
                    value={field.value}
                    defaultValue={field.value}
                    disabled={!groups.length}
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
                      {groups.map((option) => (
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

          {!documentId && (
            <FormField
              control={form.control}
              name='documentId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('assignment.form.fields.document')}</FormLabel>
                  <Select
                    onValueChange={(v) => {
                      field.onChange(v);
                    }}
                    value={field.value || undefined}
                    defaultValue={field.value || undefined}
                    disabled={!documents.length}
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
                      {documents.map((option) => (
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
