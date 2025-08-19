import { useI18n } from '@/locales/client';

type AccessLevelValue = 'NONE' | 'VIEW' | 'EDIT' | 'ADMIN';

export type AccessLevelOption = {
  value: AccessLevelValue;
  label: string;
};

export function useAccessLevelOptions(): AccessLevelOption[] {
  const t = useI18n();
  return [
    { value: 'NONE', label: t('stakeholder.accessLevels.NONE') },
    { value: 'VIEW', label: t('stakeholder.accessLevels.VIEW') },
    { value: 'EDIT', label: t('stakeholder.accessLevels.EDIT') },
    { value: 'ADMIN', label: t('stakeholder.accessLevels.ADMIN') }
  ];
}
