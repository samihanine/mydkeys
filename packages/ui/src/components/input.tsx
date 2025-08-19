'use client';

import { cn } from '../lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';

function Input({
  className,
  type,
  Icon,
  iconClassName,
  ...props
}: React.ComponentProps<'input'> & {
  Icon?: any;
  iconClassName?: string;
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const inputClasses = cn(
    'flex h-11 w-full bg-background rounded-md border border-input px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
    Icon && 'pl-10',
    type === 'password' && 'pr-16',
    className
  );

  return (
    <div className={cn('relative', className)}>
      {Icon && (
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <Icon width={20} height={20} className={cn('text-gray-500', iconClassName)} />
        </div>
      )}
      <input type={type === 'password' && showPassword ? 'text' : type} className={inputClasses} {...props} />
      {type === 'password' && (
        <div className='absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-x-1 pr-3'>
          {showPassword ? (
            <EyeOffIcon className='cursor-pointer text-gray-500' onClick={togglePasswordVisibility} size={20} />
          ) : (
            <EyeIcon className='cursor-pointer text-gray-500' onClick={togglePasswordVisibility} size={20} />
          )}
        </div>
      )}
    </div>
  );
}

export { Input };
