import { AssignmentTemplateForm } from './assignment-template-form';
import { useCreateAssignmentTemplate } from './use-create-assignment-template';
import { useI18n } from '@/locales/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@repo/ui/components/dialog';

export const CreateAssignmentTemplateModal = ({
  groupTemplateId,
  documentTemplateId,
  domainId,
  isOpen,
  onOpenChange
}: {
  groupTemplateId?: string;
  documentTemplateId?: string;
  domainId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const createAssignmentMutation = useCreateAssignmentTemplate();
  const t = useI18n();
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('assignment.create.title')}</DialogTitle>
          <DialogDescription>{t('assignment.create.description')}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <AssignmentTemplateForm
            groupTemplateId={groupTemplateId}
            documentTemplateId={documentTemplateId}
            domainId={domainId}
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
