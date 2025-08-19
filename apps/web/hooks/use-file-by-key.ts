'use client';

import { useEffect, useState } from 'react';

interface FileData {
  contentType: string;
  size: number;
  lastModified: string;
}

export const useFileByKey = (fileKey: string | undefined) => {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fileKey) {
      setFileData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    const fetchFileData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const fileUrl = process.env.NEXT_PUBLIC_FILE_ENDPOINT + '/' + fileKey;

        // Effectuer une requête HEAD pour obtenir les métadonnées du fichier
        const response = await fetch(fileUrl, {
          method: 'HEAD'
        });

        if (!response.ok) {
          throw new Error(`Erreur lors de la récupération du fichier: ${response.status}`);
        }

        const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
        const contentLength = response.headers.get('Content-Length');
        const lastModified = response.headers.get('Last-Modified') || new Date().toISOString();

        setFileData({
          contentType,
          size: contentLength ? parseInt(contentLength, 10) : 0,
          lastModified
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
        setFileData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFileData();
  }, [fileKey]);

  return {
    fileData,
    isLoading,
    error
  };
};
