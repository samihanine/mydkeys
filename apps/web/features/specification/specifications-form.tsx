'use client';

import { useCurrentProject } from '../project/use-current-project';
import { useSpecificationTemplates } from '../specification-template/use-specification-templates';
import { useI18n } from '@/locales/client';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Specification } from '@repo/database/schema';
import { insertSpecificationSchema } from '@repo/database/schema';
import { Button } from '@repo/ui/components/button';
import { Checkbox } from '@repo/ui/components/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { Switch } from '@repo/ui/components/switch';
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

const formArraySchema = z.array(insertSpecificationSchema);
const formSchema = z.object({ items: formArraySchema });

export const SpecificationsForm = ({
  specifications,
  onSubmit,
  onCancel
}: {
  specifications?: Specification[];
  onSubmit: (values: z.infer<typeof formArraySchema>) => Promise<void>;
  onCancel: () => void;
}) => {
  const t = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const projectQuery = useCurrentProject();
  const specificationTemplatesQuery = useSpecificationTemplates();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { items: [] }
  });

  const { fields, replace } = useFieldArray({
    control: form.control,
    name: 'items'
  });

  const templates = useMemo(() => {
    const all = specificationTemplatesQuery.data || [];
    const project = projectQuery.data;
    if (!project) return all;
    // Filtrer par domaine du projet si disponible
    return all.filter((tpl: any) => tpl.domainId === project.domainId);
  }, [specificationTemplatesQuery.data, projectQuery.data]);

  const existingByTemplateId = useMemo(() => {
    const map = new Map<string, Specification>();
    (specifications || []).forEach((s) => {
      if (s.specificationTemplateId) {
        map.set(s.specificationTemplateId, s);
      }
    });
    return map;
  }, [specifications]);

  // Préparer les valeurs par défaut une seule fois, lorsque projet et templates sont prêts
  const initializedRef = useRef(false);
  useEffect(() => {
    if (initializedRef.current) return;
    const project = projectQuery.data;
    if (!project || templates.length === 0) return;

    const defaults = templates.map((tpl: any) => {
      const existing = existingByTemplateId.get(tpl.id);
      let value: string = existing?.value ?? '';
      if (!existing) {
        switch (tpl.type) {
          case 'BOOLEAN':
            value = 'false';
            break;
          default:
            value = '';
        }
      }
      return {
        projectId: project.id,
        specificationTemplateId: tpl.id,
        value
      } as z.infer<typeof insertSpecificationSchema>;
    });

    replace(defaults);
    initializedRef.current = true;
  }, [projectQuery.data, templates, existingByTemplateId, replace]);

  const submit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    // S'assurer que projectId est bien renseigné
    const projectId = projectQuery.data?.id;
    const sanitized = values.items.map((v) => ({
      ...v,
      projectId: v.projectId || projectId || '',
      value: typeof v.value === 'string' ? v.value : String(v.value ?? '')
    }));
    await onSubmit(sanitized);
    form.reset({ items: sanitized });
    setIsLoading(false);
  };

  useEffect(() => {
    if (specifications) {
      form.reset({ items: specifications });
    }
  }, [specifications]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='space-y-8'>
        <div className='space-y-3'>
          <div className='space-y-6'>
            {fields.map((fieldItem, index: number) => {
              const tpl = templates[index];
              if (!tpl) return null;
              return (
                <div key={tpl.id} className='flex flex-col gap-2'>
                  {/* Champs cachés pour projectId et specificationTemplateId */}
                  <input type='hidden' {...form.register(`items.${index}.projectId` as const)} />
                  <input type='hidden' {...form.register(`items.${index}.specificationTemplateId` as const)} />

                  <FormField
                    control={form.control}
                    name={`items.${index}.value` as const}
                    render={({ field }) => {
                      const isRequired = !!tpl.isRequired;
                      const label = (
                        <span>
                          {tpl.name} {isRequired && <span className='text-red-500'>*</span>}
                        </span>
                      );

                      const description: string | undefined = tpl.description;
                      const options: string[] = (tpl.options || '')
                        .split(/[\n,]/)
                        .map((s: string) => s.trim())
                        .filter(Boolean);

                      const commonItem = (children: ReactNode) => (
                        <FormItem>
                          <FormLabel>{label}</FormLabel>
                          <FormControl>{children}</FormControl>
                          {description ? <p className='text-sm text-muted-foreground'>{description}</p> : null}
                          <FormMessage />
                        </FormItem>
                      );

                      switch (tpl.type) {
                        case 'TEXT':
                          return commonItem(
                            <Input
                              type='text'
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          );
                        case 'NUMBER':
                          return commonItem(
                            <Input
                              type='number'
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          );
                        case 'DATE':
                          return commonItem(
                            <Input
                              type='date'
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          );
                        case 'BOOLEAN': {
                          const checked = String(field.value) === 'true';
                          return commonItem(
                            <div className='flex items-center gap-3'>
                              <Switch checked={checked} onCheckedChange={(v) => field.onChange(String(!!v))} />
                            </div>
                          );
                        }
                        case 'SELECT':
                          return commonItem(
                            <Select value={field.value || undefined} onValueChange={(v) => field.onChange(v)}>
                              <SelectTrigger>
                                <SelectValue placeholder={'Sélectionner'} />
                              </SelectTrigger>
                              <SelectContent>
                                {options.map((opt) => (
                                  <SelectItem key={opt} value={opt}>
                                    {opt}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          );
                        case 'MULTI_SELECT': {
                          const selected = new Set(
                            String(field.value || '')
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean)
                          );
                          const toggle = (opt: string, on: boolean) => {
                            const next = new Set(selected);
                            if (on) next.add(opt);
                            else next.delete(opt);
                            field.onChange(Array.from(next).join(','));
                          };
                          return commonItem(
                            <div className='flex flex-col gap-2'>
                              {options.map((opt) => (
                                <label key={opt} className='flex items-center gap-2'>
                                  <Checkbox checked={selected.has(opt)} onCheckedChange={(v) => toggle(opt, !!v)} />
                                  <span>{opt}</span>
                                </label>
                              ))}
                            </div>
                          );
                        }
                        default:
                          return commonItem(
                            <Input
                              type='text'
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          );
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className='flex flex-col gap-4 md:flex-row md:justify-center'>
          <Button type='button' variant={'outline'} className='flex-1' onClick={onCancel}>
            {t('common.cancel')}
          </Button>
          <Button
            type='submit'
            variant={'default'}
            className='flex-1 md:flex-[2]'
            disabled={
              isLoading ||
              !form.formState.isDirty ||
              specificationTemplatesQuery.isLoading ||
              projectQuery.isLoading ||
              templates.length === 0
            }
          >
            {isLoading ? t('common.loading') : t('common.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
