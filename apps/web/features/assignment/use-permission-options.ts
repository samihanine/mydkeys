import { useI18n } from '@/locales/client';

export const usePermissionOptions = () => {
  const t = useI18n();
  const permissionOptions = [
    { value: 'VIEW', label: t('assignment.permissions.VIEW') },
    { value: 'EDIT', label: t('assignment.permissions.EDIT') },
    { value: 'COMMENT', label: t('assignment.permissions.COMMENT') },
    { value: 'APPROVE', label: t('assignment.permissions.APPROVE') },
    { value: 'SHARE', label: t('assignment.permissions.SHARE') },
    { value: 'MANAGE', label: t('assignment.permissions.MANAGE') },
    { value: 'OWNER', label: t('assignment.permissions.OWNER') }
  ];

  return permissionOptions;
};
