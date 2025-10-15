import { Group } from '@repo/database/schema';
import { Badge } from '@repo/ui/components/badge';

export const GroupBadge = ({ group }: { group: Group }) => {
  return (
    <Badge size='sm' variant='secondary' style={{ backgroundColor: group.hexColor }}>
      {group.name}
    </Badge>
  );
};
