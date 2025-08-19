import { User } from '@repo/database';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar';

export const UserAvatar = ({ user }: { user: User }) => {
  return (
    <Avatar className='h-8 w-8 rounded-lg bg-secondary'>
      <AvatarImage src={user.image ?? undefined} alt={`${user.name}`} />

      <AvatarFallback className='rounded-lg bg-secondary text-white'>
        {user.name.charAt(0)}
        {user.name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};
