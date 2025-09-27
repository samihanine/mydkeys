import { cn } from '../lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
  'inline-flex items-center w-fit rounded-full border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap overflow-hidden text-ellipsis',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        blue: 'bg-blue-600 hover:bg-blue-800 text-white',
        green: 'bg-green-600 hover:bg-green-800 text-white',
        yellow: 'bg-yellow-600 hover:bg-yellow-800 text-white',
        red: 'bg-red-600 hover:bg-red-800 text-white',
        purple: 'bg-purple-600 hover:bg-purple-800 text-white',
        orange: 'bg-orange-600 hover:bg-orange-800 text-white',
        pink: 'bg-pink-600 hover:bg-pink-800 text-white'
      },
      size: {
        default: 'text-sm px-2.5 py-0.5',
        sm: 'text-xs px-2 py-1',
        lg: 'text-lg px-4 py-2'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
