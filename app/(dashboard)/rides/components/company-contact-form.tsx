'use client';
import ModalButton from '@/components/modal-button';
import React, { useActionState, useEffect, useState } from 'react';
import RideCompanyForm from './ride-company-form';
import { TableCell, TableRow } from '@/components/ui/table/table';
import {
  addContactsAction,
  deleteRideContactAction
} from '@/lib/actions/ridesActions';
import { Phone, Plus, Save, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const CompanyContactForm = ({ companyName }: { companyName: string }) => {
  const [showFrom, setShowFrom] = useState(false);
  const [state, formAction, pending] = useActionState(addContactsAction, {
    success: true,
    message: ''
  });

  useEffect(() => {
    if (state.message !== '') {
      if (state.success) {
        toast.success(state.message);
        setShowFrom(false)
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <TableRow>
      <TableCell colSpan={3}>
        {showFrom ? (
          <form className="flex gap-1 items-center" action={formAction}>
            <Input
              placeholder="שם"
              name="name"
              className="p-1 h-7 text-sm placeholder:text-sm"
            />
            <Input
              placeholder="פלאפון"
              name="phone"
              className="p-1 h-7 text-sm placeholder:text-sm"
            />
            <Input name="company" className="hidden" value={companyName} />
            <Button variant={'ghost'} className="p-1 h-fit" disabled={pending}>
              <Save className="w-4 h-4" />
            </Button>
          </form>
        ) : (
          <Button
            className="h-fit p-1 flex gap-2"
            variant={'ghost'}
            onClick={() => setShowFrom(true)}
          >
            הוסף מספר
            <Plus />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default CompanyContactForm;
