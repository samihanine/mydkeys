import { useI18n } from '@/locales/client';

export const usePermissionOptions = () => {
  const t = useI18n();
  const permissionOptions = [
    { value: 'VIEW', label: 'Lecture seule' },
    { value: 'EDIT', label: 'Téléversement' },
    { value: 'COMMENT', label: 'Commentaire' },
    { value: 'APPROVE', label: 'Approbation ' },
    { value: 'MANAGE', label: 'Gestion total' }
  ];

  return permissionOptions;
};
