import { Trash2 } from 'lucide-react';

import { toast } from 'sonner';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { deleteCarAction } from '@/lib/actions/carsActions';
import useAuth from '@/lib/utils/hooks/useAuth';

interface CarActionsIconsProps {
  row: {
    original: {
      licenseNumber: string;
    };
  };
}

export default function CarActionsIcons({ row }: CarActionsIconsProps) {
  const {   isManager } = useAuth();

  const deleteCar = async () => {
    const response = await deleteCarAction(row.original.licenseNumber);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      {isManager && (
        <div className="flex justify-center m-0 p-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="rounded-full p-1" onClick={deleteCar}>
                <Trash2 className="w-4 h-4 text-red-500 " />
              </TooltipTrigger>
              <TooltipContent>
                <p>מחק רכב</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </>
  );
}
