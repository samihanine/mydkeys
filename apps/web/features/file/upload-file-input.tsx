'use client';

import { useUploadFile } from '@/features/file/use-upload-file';
import { Input } from '@repo/ui/components/input';
import { ChangeEvent, useCallback, useRef } from 'react';

type UploadFileInputProps = React.ComponentProps<typeof Input> & {
  setId: (id: string) => void;
};

export const UploadFileInput = ({ setId, ...props }: UploadFileInputProps) => {
  const uploadFileMutation = useUploadFile();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file) return;

      const result = await uploadFileMutation.mutateAsync({ file: file as any });

      if (result.id) {
        setId(result.id as string);
      }
    },
    [setId, uploadFileMutation]
  );

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  return (
    <input
      {...props}
      ref={inputRef}
      type='file'
      onChange={handleFileChange}
      disabled={uploadFileMutation.isPending}
      accept={props.accept}
      name={props.name}
      id={props.id}
    />
  );
};
