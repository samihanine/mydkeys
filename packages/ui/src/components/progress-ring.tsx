import { cn } from '@/lib/utils';
import * as React from 'react';

export interface ProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
  percentage: number;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  strokeWidth?: number;
  showLabel?: boolean;
  label?: React.ReactNode;
}

export const ProgressRing = ({
  percentage,
  size = 'md',
  strokeWidth = 10,
  showLabel = true,
  label,
  className,
  ...rest
}: ProgressRingProps) => {
  const clamped = Math.max(0, Math.min(100, Number.isFinite(percentage) ? percentage : 0));

  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - clamped / 100);

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-20 h-20 text-lg',
    xl: 'w-24 h-24 text-2xl',
    '2xl': 'w-32 h-32 text-3xl',
    '3xl': 'w-40 h-40 text-4xl',
    '4xl': 'w-48 h-48 text-5xl'
  } as const;

  const defaultColorClass = clamped < 40 ? 'text-red-500' : clamped < 70 ? 'text-yellow-500' : 'text-green-500';

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center',
        sizeClasses[size],
        defaultColorClass,
        className
      )}
      role='progressbar'
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      {...rest}
    >
      <svg className='absolute inset-0' viewBox='0 0 100 100'>
        {/* Track (piste grise) */}
        <circle
          className='text-gray-200 dark:text-gray-800'
          stroke='currentColor'
          strokeWidth={strokeWidth}
          fill='transparent'
          cx='50'
          cy='50'
          r={radius}
        />

        {/* Progress (hérite de la couleur courante: text-*) */}
        <g className='origin-center -rotate-90'>
          <circle
            className='text-current transition-[stroke-dashoffset] duration-300 ease-out'
            stroke='currentColor'
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            fill='transparent'
            cx='50'
            cy='50'
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </g>
      </svg>

      {showLabel && (
        <span className='font-semibold tabular-nums' aria-hidden>
          {label ?? `${Math.round(clamped)}%`}
        </span>
      )}
    </div>
  );
};
