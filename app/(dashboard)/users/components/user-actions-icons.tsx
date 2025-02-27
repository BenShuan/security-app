import {  PencilIcon, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import Link from 'next/link';
import { deleteUserAction } from '@/lib/actions/userActions';
import { toast } from 'sonner';
interface UsersActionIconsProps {
  row: {
    original: {
      userName:string
    };
  };
}

export default function UsersActionIcons({ row }: UsersActionIconsProps) {

  const deleteUser = async () => {
    const response = await deleteUserAction(row.original.userName);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="flex justify-center gap-4 m-0 p-0">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className="rounded-full p-1"
            onClick={deleteUser}
          >
            <Trash2 className="w-4 h-4 text-destructive " />
          </TooltipTrigger>
          <TooltipContent>
            <p>מחק משתמש</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="rounded-full p-1">
            <Link
              href={`/users/user-form?edit=true&user-id=${row.original.userName}`}
            >
              <PencilIcon className="w-4 h-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>עדכן פרטי עובד</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
