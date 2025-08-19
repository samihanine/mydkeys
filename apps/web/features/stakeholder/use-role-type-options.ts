import { useI18n } from '@/locales/client';

export const useRoleTypeOptions = () => {
  const t = useI18n();
  const roleTypeOptions = [
    { value: 'PROFESSIONAL', label: t('stakeholder.roleTypes.PROFESSIONAL') },
    { value: 'PARENT', label: t('stakeholder.roleTypes.PARENT') },
    { value: 'CHILD', label: t('stakeholder.roleTypes.CHILD') }
  ];

  return roleTypeOptions;
};
