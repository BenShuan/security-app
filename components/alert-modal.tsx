import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

interface AlertModalProps {
  title: string;
  description: string;
  action: string;
  cancel: string;
  triggerHidden?: boolean;
  trigger?: React.ReactNode;
  actionFunction?: () => void;
  cancelFunction?: () => void;
}

function AlertModal({ title, description, action, cancel, triggerHidden, trigger, actionFunction, cancelFunction }: AlertModalProps) {
  return (
    <AlertDialog open={triggerHidden} >
      <AlertDialogTrigger className="hidden" >{trigger}</AlertDialogTrigger>
      <AlertDialogContent >
        <AlertDialogHeader className="*:text-right">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-start gap-4">
          <AlertDialogCancel onClick={cancelFunction}>{cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={actionFunction}>{action}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertModal;
