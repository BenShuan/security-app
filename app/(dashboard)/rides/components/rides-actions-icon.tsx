import { PencilIcon, Trash2 } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import Link from 'next/link';
import { toast } from 'sonner';
import { deleteEmployeeAction } from '@/lib/actions/employeesActions';

interface RidesActionsProps {
  row: {
    original: {
      id: string;
    };
  };
}

export default function RidesActionIcons({ row }: RidesActionsProps) {
  const deleteRide = async () => {
    const response = await deleteEmployeeAction(row.original.id);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };


  return (
    <div className="flex justify-end gap-1 m-0 p-0">

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="rounded-full p-1" onClick={deleteRide}>
            <Trash2 className="w-4 h-4 text-red-500 " />
          </TooltipTrigger>
          <TooltipContent>
            <p>מחק נסיעה</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="rounded-full p-1">
            <Link
              href={`/keys/new-key?isEdit=true&keyNumber=${row.original.id}`}
            >
              <PencilIcon className="w-4 h-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>עדכן פרטי מפתח</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
