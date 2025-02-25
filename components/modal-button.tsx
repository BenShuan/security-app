import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogProps } from "@radix-ui/react-dialog"


interface ModalButtonProps extends DialogProps {
    title: string,
    icon?: React.ReactNode,
  closeFunction?: () => boolean,


}


function ModalButton({ title,icon,children ,onOpenChange, closeFunction, ...props }: ModalButtonProps) {



  return (
    <Dialog {...props} onOpenChange={closeFunction||onOpenChange}  >
    <DialogTrigger   className="rounded-full bg-secondary text-white flex items-center gap-2 px-4 py-2" >{title} {icon}</DialogTrigger>
    <DialogContent aria-describedby={title}  >
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-right">{title}</DialogTitle>
      </DialogHeader>
          {children}
    </DialogContent>
  </Dialog>

  

  )

}


export default ModalButton