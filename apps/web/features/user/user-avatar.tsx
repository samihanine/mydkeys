import { User } from '@repo/database';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar';
import { cn } from '@repo/ui/lib/utils';

export const UserAvatar = ({ user, className }: { user: User; className?: string }) => {
  return (
    <Avatar className={cn('h-8 w-8 rounded-lg bg-secondary', className)}>
      <AvatarImage src={user.image ?? undefined} alt={`${user.name}`} />

      <AvatarFallback className='rounded-lg bg-secondary text-white'>
        {user.name.charAt(0)}
        {user.name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};
