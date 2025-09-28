'use client';

import { useFileByKey } from '@/features/file/use-file-by-key';
import { useI18n } from '@/locales/client';
import { Button } from '@repo/ui/components/button';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';

interface FilePreviewProps {
  fileKey: string | undefined;
  title?: string;
}

export const FilePreview = ({ fileKey, title }: FilePreviewProps) => {
  const t = useI18n();
  const { fileData, isLoading, error } = useFileByKey(fileKey);

  // Si pas de clé de fichier, ne rien afficher
  if (!fileKey) {
    return null;
  }

  const fileUrl = process.env.NEXT_PUBLIC_FILE_ENDPOINT + '/' + fileKey;

  // État de chargement
  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center p-8 border rounded bg-gray-50'>
        <LoadingSpinner />
        <p className='mt-2 text-sm text-gray-600'>{t('document.loadingPreview')}</p>
      </div>
    );
  }

  // Gestion d'erreur
  if (error) {
    return (
      <div className='p-4 border rounded bg-red-50 text-center'>
        <p className='text-red-600 mb-2'>{t('document.previewError')}</p>
        <p className='text-sm text-red-500'>{error}</p>
      </div>
    );
  }

  // Si pas de données de fichier
  if (!fileData) {
    return (
      <div className='p-4 border rounded bg-gray-50 text-center'>
        <p className='text-gray-600'>{t('document.noFileData')}</p>
      </div>
    );
  }

  // Rendu conditionnel basé sur le type de contenu
  const renderPreviewContent = () => {
    if (fileData.contentType.startsWith('image/')) {
      return (
        <img
          src={fileUrl}
          alt={title || t('document.documentPreview')}
          className='max-h-96 max-w-full rounded border'
          style={{ objectFit: 'contain', margin: '0 auto' }}
        />
      );
    }

    if (fileData.contentType === 'application/pdf') {
      return (
        <iframe
          src={fileUrl}
          title={title || t('document.documentPreview')}
          className='w-full h-96 border rounded'
          style={{ minHeight: 400 }}
        />
      );
    }

    // Pour les autres types de fichiers
    return (
      <div className='p-4 border rounded bg-gray-50 text-center'>
        <p className='mb-2'>
          {t('document.fileType')} {fileData.contentType}
        </p>
        <p className='text-sm text-gray-600 mb-4'>
          {t('document.fileSize')}: {(fileData.size / 1024).toFixed(2)} KB
        </p>
        <Button
          variant='link'
          onClick={() => {
            window.open(fileUrl, '_blank');
          }}
        >
          {t('document.openInNewTab')}
        </Button>
      </div>
    );
  };

  return (
    <div className='space-y-4'>
      {renderPreviewContent()}

      {/* Bouton de téléchargement */}
      <div className='flex justify-center'>
        <Button
          variant='secondary'
          onClick={() => {
            const a = window.document.createElement('a');
            a.href = fileUrl;
            a.download = title || 'document';
            a.target = '_blank';
            a.click();
          }}
          type='button'
        >
          {t('document.downloadFile')}
        </Button>
      </div>
    </div>
  );
};
