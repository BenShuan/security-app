'use client';
import ModalButton from '@/components/modal-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addRideCompanyAction } from '@/lib/actions/ridesActions';
import React, { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

const RideCompanyForm = () => {

  const [open, setOpen] = useState(false)
  const [state, formAction, pending] = useActionState(addRideCompanyAction, {
    success: true,
    message: ''
  });
  
  useEffect(() => {
    if (state.message !== '') {
      if(state.success){
        
        toast.success(state.message) 
        setOpen(false)
      } else{

        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <ModalButton title="הוסף חברה" open={open} onOpenChange={setOpen} >
      <form
        action={formAction}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
      >
        <Input placeholder="שם החברה" name="name" />
        <Input placeholder="איזורי עבודה" name="areas" />
        <Button disabled={pending}>שמור</Button>
        {!state.success && (
          <span className="text-destructive">{state.message}</span>
        )}
      </form>
    </ModalButton>
  ); 
};

export default RideCompanyForm;
