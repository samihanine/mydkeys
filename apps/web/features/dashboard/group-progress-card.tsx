import { useAssignmentsByCurrentProject } from '../assignment/use-assignments-by-current-project';
import { useDocumentsByCurrentProject } from '../document/use-documents-by-current-project';
import { GroupBadge } from '../group/group-badge';
import { Group } from '@repo/database/schema';
import { Card, CardContent } from '@repo/ui/components/card';
import { ProgressRing } from '@repo/ui/components/progress-ring';
import { cn } from '@repo/ui/lib/utils';

export const GroupProgressCard = ({ group, className }: React.HTMLAttributes<HTMLDivElement> & { group: Group }) => {
  const documentsQuery = useDocumentsByCurrentProject();
  const assignmentsQuery = useAssignmentsByCurrentProject();

  const assignments = assignmentsQuery.data?.filter((assignment) => assignment.groupId === group.id) || [];
  const documents =
    documentsQuery.data?.filter((document) =>
      assignments.some((assignment) => assignment.documentId === document.id)
    ) || [];

  const completedDocuments = documents.filter((document) => document.status === 'APPROVED');
  const percentage = (completedDocuments.length / documents.length) * 100;

  return (
    <Card className={cn(className)}>
      <CardContent className='flex flex-col items-center gap-4 justify-center'>
        <ProgressRing size='xl' percentage={percentage} />

        <div className='flex flex-col gap-2 text-muted-foreground text-sm text-center'>
          {completedDocuments.length} / {documents.length} docs validés
        </div>

        <GroupBadge name={group.name} hexColor={group.hexColor} />
      </CardContent>
    </Card>
  );
};
