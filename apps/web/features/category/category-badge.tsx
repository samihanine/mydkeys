import type { Category } from '@repo/database/schema';
import { Badge } from '@repo/ui/components/badge';

export const CategoryBadge = ({ category }: { category: Category }) => {
  return (
    <Badge variant='secondary' className='px-2 py-1 text-white' style={{ backgroundColor: category.hexColor }}>
      {category.name}
    </Badge>
  );
};
