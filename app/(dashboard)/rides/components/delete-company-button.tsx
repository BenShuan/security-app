'use client';
import { Spinner } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { deleteRideCompanyctAction } from '@/lib/actions/ridesActions';
import { Trash2 } from 'lucide-react';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

const DeleteCompanyButton = ({ companyName }: { companyName: string }) => {
  const [isPending, startTransition] = useTransition();

  const deleteRideCompany = async () => {
    startTransition(async() => {
      const ans = await deleteRideCompanyctAction(companyName);

      if (ans.success) {
        toast.success(ans.message);
      } else {
        toast.error(ans.message);
      }
      
    });
  };
  return (
    <div
      className="rounded-full absolute p-0 h-4 w-4 opacity-0 group-hover:opacity-100 top-0 left-0 transition-all duration-300 "
      onClick={!isPending?deleteRideCompany:undefined}
      // disabled={isPending}
    >
      {!isPending ? (
        <Trash2 className="w-4 h-4 text-destructive " />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default DeleteCompanyButton;
