import { type ClassValue, clsx } from 'clsx';
import * as React from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
