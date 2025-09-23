import { useI18n } from '@/locales/client';

type AccessLevelValue = 'NONE' | 'VIEW' | 'EDIT' | 'ADMIN';

export type AccessLevelOption = {
  value: AccessLevelValue;
  label: string;
};

export function useAccessLevelOptions(): AccessLevelOption[] {
  const t = useI18n();
  return [
    { value: 'NONE', label: t('member.accessLevels.NONE') },
    { value: 'VIEW', label: t('member.accessLevels.VIEW') },
    { value: 'EDIT', label: t('member.accessLevels.EDIT') },
    { value: 'ADMIN', label: t('member.accessLevels.ADMIN') }
  ];
}
