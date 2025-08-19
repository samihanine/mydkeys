import { useI18n } from '@/locales/client';
import { DocumentType } from '@repo/database/schema';

export const useDocumentTypeOptions = (): { value: DocumentType; label: string }[] => {
  const t = useI18n();
  return [
    { value: 'EVALUATION_REPORT', label: t('document.types.EVALUATION_REPORT') },
    { value: 'THERAPY_REPORT', label: t('document.types.THERAPY_REPORT') },
    { value: 'EDUCATIONAL_PLAN', label: t('document.types.EDUCATIONAL_PLAN') },
    { value: 'PARENT_CONSENT', label: t('document.types.PARENT_CONSENT') },
    { value: 'SCHOOL_REPORT', label: t('document.types.SCHOOL_REPORT') },
    { value: 'MEETING_MINUTES', label: t('document.types.MEETING_MINUTES') },
    { value: 'REFERRAL_LETTER', label: t('document.types.REFERRAL_LETTER') },
    { value: 'OBSERVATION_NOTE', label: t('document.types.OBSERVATION_NOTE') },
    { value: 'PROGRESS_NOTE', label: t('document.types.PROGRESS_NOTE') },
    { value: 'EXTERNAL_DOCUMENT', label: t('document.types.EXTERNAL_DOCUMENT') },
    { value: 'ADMINISTRATIVE_DOCUMENT', label: t('document.types.ADMINISTRATIVE_DOCUMENT') },
    { value: 'OTHER', label: t('document.types.OTHER') }
  ];
};
