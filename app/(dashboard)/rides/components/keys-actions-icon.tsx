import { BookKeyIcon, PencilIcon, Trash2 } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import Link from 'next/link';
import { toast } from 'sonner';
import { deleteEmployeeAction } from '@/lib/actions/employeesActions';
import { Button } from '@/components/ui/button';
import { retriveKeyLogAction } from '@/lib/actions/keysActions';

interface KeysActionsProps {
  row: {
    original: {
      keyNumber: string;
      keyLog:        {
          retrievedAt:Date|null
        }[]
    };
  };
}

export default function KeyActionIcons({ row }: KeysActionsProps) {
  const deleteKey = async () => {
    const response = await deleteEmployeeAction(row.original.keyNumber);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  
  const retriveKey = async () => {
    const response = await retriveKeyLogAction(row.original.keyNumber);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="flex justify-end gap-1 m-0 p-0">
            {row.original?.keyLog[0]?.retrievedAt===null &&<TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="rounded-full p-1">
              <BookKeyIcon onClick={retriveKey} className="w-4 h-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>החזר מפתח</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="rounded-full p-1" onClick={deleteKey}>
            <Trash2 className="w-4 h-4 text-red-500 " />
          </TooltipTrigger>
          <TooltipContent>
            <p>מחק מפתח</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="rounded-full p-1">
            <Link
              href={`/keys/new-key?isEdit=true&keyNumber=${row.original.keyNumber}`}
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
