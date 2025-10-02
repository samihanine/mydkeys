import { AssignmentForm } from './assignment-form';
import { useCreateAssignment } from './use-create-assignment';
import { useI18n } from '@/locales/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@repo/ui/components/dialog';

export const CreateAssignmentModal = ({
  groupId,
  documentId,
  isOpen,
  onOpenChange
}: {
  groupId?: string;
  documentId?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const createAssignmentMutation = useCreateAssignment();
  const t = useI18n();
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('assignment.create.title')}</DialogTitle>
          <DialogDescription>{t('assignment.create.description')}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <AssignmentForm
            groupId={groupId}
            documentId={documentId}
            onSubmit={async (values) => {
              await createAssignmentMutation.mutateAsync(values);
              onOpenChange(false);
            }}
            onCancel={() => onOpenChange(false)}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
