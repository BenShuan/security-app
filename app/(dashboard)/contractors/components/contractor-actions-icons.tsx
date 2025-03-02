import { ClockIcon, PencilIcon } from 'lucide-react';
import {
  addMonthToContractorAction} from '@/lib/actions/contractorsActions';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import Link from 'next/link';
import { toast } from 'sonner';
interface ContractorActionsProps {
  row: {
    original: {
      employeeId: string;
    };
  };
}

export default function ContractorActions({ row }: ContractorActionsProps) {
  const addMonthToContractor = async () => {
    await addMonthToContractorAction(row.original.employeeId);

    toast.success('תוקף עודכן בהצלחה');
  };

  return (
    <div className="flex justify-center gap-2 m-0 p-0">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className="rounded-full p-1"
            onClick={addMonthToContractor}
          >
            <ClockIcon className="w-4 h-4 text-green-500 " />
          </TooltipTrigger>
          <TooltipContent>
            <p>הוספת חודש לתוקף</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="rounded-full p-1">
            <Link
              href={`/contractors/new-contractor?isEdit=true&employeeId=${row.original.employeeId}`}
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
