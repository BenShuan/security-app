import { Button } from '@/components/ui/button';
import { ClockIcon, PencilIcon } from 'lucide-react';
import {
  addMonthToContractorAction,
  updateContractorAction
} from '@/lib/actions/contractors';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';

interface ContractorActionsProps {
  row: {
    original: {
      employeeId: string;
    };
  };
}

export default function ContractorActions({ row }: ContractorActionsProps) {
  const addMonthToContractor = addMonthToContractorAction.bind(
    null,
    row.original.employeeId
  );

  return (
    <div className="flex justify-between m-0 p-0">
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

      <Button
        variant="ghost"
        className="rounded-full p-1"
        formAction={updateContractorAction}
      >
        <PencilIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
