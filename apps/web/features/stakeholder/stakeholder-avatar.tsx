import { Stakeholder } from '@repo/database/schema';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar';
import { cn } from '@repo/ui/lib/utils';
import { FC } from 'react';

export const StakeholderAvatar: FC<{ stakeholder: Stakeholder; size?: 'sm' | 'md' | 'lg' }> = ({
  stakeholder,
  size = 'md'
}) => {
  const src = stakeholder.imageFileId
    ? process.env.NEXT_PUBLIC_FILE_ENDPOINT + '/' + stakeholder.imageFileId
    : undefined;
  return (
    <Avatar
      className={cn(
        'h-8 w-8 rounded-lg',
        size === 'sm' && 'h-6 w-6',
        size === 'md' && 'h-8 w-8',
        size === 'lg' && 'h-16 w-16'
      )}
    >
      <AvatarImage src={src} alt={stakeholder.displayName} />

      <AvatarFallback className='rounded-lg'>{stakeholder.displayName.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};
