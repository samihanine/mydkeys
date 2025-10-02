import { AssignmentForm } from './assignment-form';
import { useAssignmentById } from './use-assignment-by-id';
import { useUpdateAssignment } from './use-update-assignment';
import { useI18n } from '@/locales/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@repo/ui/components/dialog';

export const UpdateAssignmentModal = ({
  groupId,
  documentId,
  isOpen,
  onOpenChange,
  assignmentId
}: {
  groupId?: string;
  documentId?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  assignmentId: string;
}) => {
  const updateAssignmentMutation = useUpdateAssignment();
  const t = useI18n();
  const assignmentQuery = useAssignmentById(assignmentId);
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('assignment.update.title')}</DialogTitle>
          <DialogDescription>{t('assignment.update.description')}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <AssignmentForm
            groupId={groupId}
            documentId={documentId}
            assignment={assignmentQuery.data}
            onSubmit={async (values) => {
              await updateAssignmentMutation.mutateAsync({ ...values, id: assignmentQuery.data?.id! });
              onOpenChange(false);
            }}
            onCancel={() => onOpenChange(false)}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
