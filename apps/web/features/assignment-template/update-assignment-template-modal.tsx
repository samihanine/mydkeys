import { AssignmentTemplateForm } from './assignment-template-form';
import { useAssignmentTemplateById } from './use-assignment-template-by-id';
import { useUpdateAssignmentTemplate } from './use-update-assignment-template';
import { useI18n } from '@/locales/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@repo/ui/components/dialog';

export const UpdateAssignmentTemplateModal = ({
  groupTemplateId,
  documentTemplateId,
  isOpen,
  onOpenChange,
  assignmentTemplateId,
  domainId
}: {
  groupTemplateId?: string;
  documentTemplateId?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  assignmentTemplateId: string;
  domainId: string;
}) => {
  const updateAssignmentTemplateMutation = useUpdateAssignmentTemplate();
  const t = useI18n();
  const assignmentTemplateQuery = useAssignmentTemplateById(assignmentTemplateId);
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('assignment.update.title')}</DialogTitle>
          <DialogDescription>{t('assignment.update.description')}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <AssignmentTemplateForm
            groupTemplateId={groupTemplateId}
            documentTemplateId={documentTemplateId}
            domainId={domainId}
            assignmentTemplate={assignmentTemplateQuery.data}
            onSubmit={async (values) => {
              await updateAssignmentTemplateMutation.mutateAsync({ ...values, id: assignmentTemplateQuery.data?.id! });
              onOpenChange(false);
            }}
            onCancel={() => onOpenChange(false)}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
