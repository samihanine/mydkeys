'use client';

import { queryClient } from '@/lib/orpc';
import { Toaster } from '@repo/ui/components/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

      <Toaster position='top-right' richColors />
    </>
  );
};
