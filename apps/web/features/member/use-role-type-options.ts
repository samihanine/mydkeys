import { useI18n } from '@/locales/client';

export const useRoleTypeOptions = () => {
  const t = useI18n();
  const roleTypeOptions = [
    { value: 'PROFESSIONAL', label: t('member.roleTypes.PROFESSIONAL') },
    { value: 'PARENT', label: t('member.roleTypes.PARENT') },
    { value: 'CHILD', label: t('member.roleTypes.CHILD') }
  ];

  return roleTypeOptions;
};
