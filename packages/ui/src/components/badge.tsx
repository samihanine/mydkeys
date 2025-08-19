import { cn } from '../lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap overflow-hidden text-ellipsis',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        blue: 'border-blue-600 bg-blue-100 text-blue-600 hover:bg-blue-200',
        green: 'border-green-600 bg-green-100 text-green-600 hover:bg-green-200',
        yellow: 'border-yellow-600 bg-amber-100 text-yellow-600 hover:bg-yellow-200',
        red: 'border-red-600 bg-red-100 text-red-600 hover:bg-red-200',
        purple: 'border-purple-600 bg-purple-100 text-purple-600 hover:bg-purple-200',
        orange: 'border-orange-600 bg-orange-100 text-orange-600 hover:bg-orange-200',
        pink: 'border-pink-600 bg-pink-100 text-pink-600 hover:bg-pink-200'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
