import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { signOutAction } from '@/lib/actions/auth';
import { requireAuth } from '@/lib/auth';

export async function User() {
  let user = await requireAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex items-center gap-4'>
          <p className='text-background'>Hello <b>{user.userName}</b></p>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src={'/placeholder-user.jpg'}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user ? (
          <DropdownMenuItem>
            <form action={signOutAction}>
              <button type="submit">התנתק</button>
            </form>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href="/login">התחבר</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
