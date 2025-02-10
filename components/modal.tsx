import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ButtonProps } from './ui/button';
import { DialogProps } from '@radix-ui/react-dialog';

interface ModalProps extends DialogProps {
  title: string;
  className?: string;
}

function Modal({ title, children,className, ...props }: ModalProps) {
  return (

    <Dialog {...props}  >
      <DialogContent aria-describedby={title} className={className}>

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-right mb-2">
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
