import { Button } from '@/components/ui/button';
import { KeyIcon } from 'lucide-react';
import Link from 'next/link';

export default function AddNewKey() {
  return (
    <Button
      variant="secondary"
      className="rounded-full bg-secondary text-white  px-4 py-2 "
      type="button"
    >
      <Link href={'/keys/new-key'} className="flex items-center gap-2">
        הוסף מפתח
        <KeyIcon />
      </Link>
    </Button>
  );
}
