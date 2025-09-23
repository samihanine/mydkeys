import { Domain } from '@repo/database/schema';
import { Badge } from '@repo/ui/components/badge';

export const DomainBadge = ({ domain }: { domain: Domain }) => {
  return <Badge variant='secondary'>{domain.name}</Badge>;
};
