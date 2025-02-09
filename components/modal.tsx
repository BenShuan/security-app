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
}

function Modal({ title, children, ...props }: ModalProps) {
  return (

    <Dialog {...props} >
      <DialogContent aria-describedby={title}>

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-right">
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
