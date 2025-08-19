import { cn } from '../lib/utils';
import * as React from 'react';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
}

type CircleSize = number | string;

function SkeletonCircle({
  size = 32,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { size?: CircleSize }) {
  const dimension = typeof size === 'number' ? `${size}px` : size;
  return (
    <div
      className={cn('animate-pulse rounded-full bg-muted', className)}
      style={{ width: dimension, height: dimension }}
      {...props}
    />
  );
}

function SkeletonText({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded bg-muted h-4', className)} {...props} />;
}

function SkeletonLines({
  lines = 3,
  className,
  lineClassName
}: {
  lines?: number;
  className?: string;
  lineClassName?: string;
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonText key={index} className={cn('w-full', lineClassName)} />
      ))}
    </div>
  );
}

export { Skeleton, SkeletonCircle, SkeletonText, SkeletonLines };
