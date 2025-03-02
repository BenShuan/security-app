'use client';
import { Spinner } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table/table';
import { deleteRideContactAction } from '@/lib/actions/ridesActions';
import { RideContacts } from '@prisma/client';
import { Phone, Trash2 } from 'lucide-react';
import React, { useTransition } from 'react';
import { toast } from 'sonner';

const ContactItem = ({ contact }: { contact: RideContacts }) => {
  const [isPending, startTransition] = useTransition();

  const deleteRideContact = async () => {
    startTransition(async() => {
     const ans = await deleteRideContactAction(contact.phoneNumber);

      if (ans.success) {
        toast.success(ans.message);
      } else {
        toast.error(ans.message);
      }

    });
  };

  return (
    <TableRow>
      <TableCell>{contact.name}</TableCell>
      <TableCell>{contact.phoneNumber}</TableCell>
      <TableCell className="flex gap-2 content-center justify-center items-start relative">
        <Phone className="h-4 w-4" />
        {!isPending ? (
          <Button
            variant={'ghost'}
            className="p-0 h-fit "
            onClick={deleteRideContact}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        ) : (
          <Spinner />
        )}
      </TableCell>
    </TableRow>
  );
};

export default ContactItem;
