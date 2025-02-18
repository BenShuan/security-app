'use client';

import AlertModal from '@/components/alert-modal';
import { Button } from '@/components/ui/button';
import { updateCarsAction } from '@/lib/actions/carsActions';
import { FileScanIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export default function UpdateCarsButton() {

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const result = await updateCarsAction(formData);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form action={handleSubmit} className="w-fit ">
      <input
        ref={fileInputRef}
        type="file"
        name="file"
        accept='.csv'
        hidden={true}
        onChange={handleFileChange}
      />

      <AlertModal
        title="עדכן מצבת רכבים"
        description="האם אתה בטוח שברצונך לעדכן את הרכבים?"
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
        type="button"
      >
        עדכן מצבה
        <FileScanIcon />
      </Button>
    </form>
  );
}
