import { Project } from '@repo/database';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar';
import { cn } from '@repo/ui/lib/utils';

export const ProjectAvatar = ({ project, size = 'md' }: { project: Project; size?: 'sm' | 'md' | 'lg' | 'xl' }) => {
  const src = project.imageFileId ? process.env.NEXT_PUBLIC_FILE_ENDPOINT + '/' + project.imageFileId : undefined;
  return (
    <Avatar
      className={cn(
        'rounded-lg',
        size === 'sm' && 'h-6 w-6',
        size === 'md' && 'h-8 w-8',
        size === 'lg' && 'h-12 w-12',
        size === 'xl' && 'h-20 w-20'
      )}
    >
      <AvatarImage className='object-contain' src={src} alt={project.name} />

      <AvatarFallback className='rounded-lg text-white bg-secondary'>{project.name.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};
