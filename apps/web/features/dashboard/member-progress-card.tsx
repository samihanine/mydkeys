import { useDocuments } from '../document/use-documents';
import { useMemberTemplatesByCurrentProject } from '../member/use-member-template-by-current-project';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent } from '@repo/ui/components/card';
import { LoadingSpinner } from '@repo/ui/components/loading-spinner';
import { H3 } from '@repo/ui/components/typography';
import { cn } from '@repo/ui/lib/utils';
import { EyeIcon } from 'lucide-react';

export const MemberProgressCard = () => {
  const memberTemplatesQuery = useMemberTemplatesByCurrentProject();
  const documentsQuery = useDocuments();

  if (documentsQuery.isFetching || memberTemplatesQuery.isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <Card>
      <CardContent className='flex flex-col gap-4'>
        {memberTemplatesQuery.data?.map((memberTemplate) => {
          const completedDocuments = documentsQuery.data?.filter((document) => document.status === 'APPROVED') || [];
          const totalDocuments = documentsQuery.data?.length || 0;
          const percentage = totalDocuments > 0 ? (completedDocuments.length / totalDocuments) * 100 : 0;

          return (
            <div key={memberTemplate.id} className='flex justify-between items-center gap-2'>
              <H3>{memberTemplate.name}</H3>

              <div className='flex gap-6 w-full max-w-sm items-center'>
                <span className='text-sm text-muted-foreground'>{percentage}%</span>
                <div className='bg-gray-100 rounded-xl p-1 w-full max-w-sm h-6'>
                  <div
                    className={cn('h-full rounded-xl bg-secondary', memberTemplate.hexColor)}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <Button variant='outline'>
                  <EyeIcon className='h-4 w-4' />
                  Voir
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
