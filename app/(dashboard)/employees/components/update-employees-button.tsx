'use client';

import AlertModal from '@/components/alert-modal';
import { Button } from '@/components/ui/button';
import { updateEmployeesAction } from '@/lib/actions/employeesActions';
import { FileScanIcon } from 'lucide-react';
import { useActionState, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function UpdateEmployeesButton() {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isPending,startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // check if the file is a csv file and if it is, read the file
    setIsOpen(true);
  };

  const handleConfirm = () => {
    fileInputRef.current?.form?.requestSubmit();
    setIsOpen(false);
  };
  
  const handleCancel = () => {
    fileInputRef.current?.form?.reset();
    setIsOpen(false);
    toast.error( 'העדכון בוטל');
  };

  const handleSubmit = async (formData: FormData) => {
   startTransition(async () => { 
    const result = await updateEmployeesAction(formData);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }});
  }
  return (
    <form action={handleSubmit} className="w-fit ">
      <input
        ref={fileInputRef}
        type="file"
        name="file"
        hidden={true}
        onChange={handleFileChange}
      />

      <AlertModal
        title="עדכן עובדים"
        description="האם אתה בטוח שברצונך לעדכן את העובדים?"
        action="עדכן"
        cancel="ביטול"
        triggerHidden={isOpen}
        actionFunction={handleConfirm}
        cancelFunction={handleCancel}
      />

      <Button
        variant="secondary"
        className="rounded-full bg-secondary text-white flex items-center gap-2 px-4 py-2 "
        onClick={handleClick}
        disabled={isPending}
        type="button"
      >
        עדכן עובדים
        <FileScanIcon />
      </Button>
    </form>
  );
}
