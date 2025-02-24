import { Button } from '@/components/ui/button';
import { BusIcon, KeyIcon } from 'lucide-react';
import Link from 'next/link';

export default function AddNewRideLog() {
  return (
    <Button
      variant="secondary"
      className="rounded-full bg-secondary text-white  px-4 py-2 "
      type="button"
    >
      <Link href={'/rides/new-ridelog'} className="flex items-center gap-2">
        הוסף נסיעה
        <BusIcon />
      </Link>
    </Button>
  );
}
