'use client';

import { useCreateFile } from '@/hooks/use-create-file';
import { useI18n } from '@/locales/client';
import { Input } from '@repo/ui/components/input';
import { cn } from '@repo/ui/lib/utils';
import { Loader2 } from 'lucide-react';
import { ChangeEvent, useCallback, useRef, useState } from 'react';

type UploadFileInputProps = React.ComponentProps<typeof Input> & {
  setKey: (key: string) => void;
};

export const UploadFileInput = ({ setKey, ...props }: UploadFileInputProps) => {
  const t = useI18n();
  const uploadFileMutation = useCreateFile();
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file) return;

      const result = await uploadFileMutation.mutateAsync({ file: file as any });

      if (result.key) {
        setKey(result.key as string);
      }
    },
    [setKey, uploadFileMutation]
  );

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className='space-y-4'>
      <div
        className={cn(
          'border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer transition-colors',
          isDragging ? 'border-primary bg-primary/5' : 'border-border',
          uploadFileMutation.isPending && 'opacity-50 cursor-not-allowed'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className='space-y-2 text-muted-foreground'>
          {uploadFileMutation.isPending ? (
            <div className='flex items-center justify-center gap-2'>
              <Loader2 className='h-4 w-4 animate-spin' />
              <span>{t('upload.loading')}</span>
            </div>
          ) : (
            <>
              <p className='text-sm'>{t('upload.dragDrop')}</p>
              <input
                ref={inputRef}
                type='file'
                onChange={handleFileChange}
                disabled={uploadFileMutation.isPending}
                className='hidden'
                accept={props.accept}
                name={props.name}
                id={props.id}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
