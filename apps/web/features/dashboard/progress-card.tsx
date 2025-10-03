import { Document } from '@repo/database';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { ProgressRing } from '@repo/ui/components/progress-ring';

export const ProgressCard = ({ documents }: { documents: Document[] }) => {
  const completedDocuments = documents.filter((document) => document.status === 'APPROVED');
  const percentage = (completedDocuments.length / documents.length) * 100;

  return (
    <Card className='w-full md:max-w-sm'>
      <CardContent className='flex flex-col items-center gap-2 justify-center'>
        <ProgressRing size='2xl' percentage={percentage} />

        <div className='flex flex-col gap-2 text-muted-foreground'>
          {completedDocuments.length} / {documents.length} documents validés
        </div>
      </CardContent>
    </Card>
  );
};
