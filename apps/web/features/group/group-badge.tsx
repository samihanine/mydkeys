import { Badge } from '@repo/ui/components/badge';

export const GroupBadge = ({ name, hexColor }: { name: string; hexColor: string }) => {
  return (
    <Badge size='sm' variant='secondary' style={{ backgroundColor: hexColor }}>
      {name}
    </Badge>
  );
};
