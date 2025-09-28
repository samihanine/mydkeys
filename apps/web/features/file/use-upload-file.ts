'use client';

import { orpc } from '@/lib/orpc';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUploadFile() {
  return useMutation(
    orpc.file.upload.mutationOptions({
      onSuccess: () => {
        toast.success('File uploaded');
      },
      onError: () => {
        toast.error('Failed to upload file');
      }
    })
  );
}
