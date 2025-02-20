import { getPasswordsInGroups } from '@/lib/db/DBPassword';
import PasswordGroup from './components/password-group';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';

export default async function PasswordPage() {
  const passwords = await getPasswordsInGroups()

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 ">סיסמאות</h1>
      {passwords.length === 0 ? (
        <div className="text-center text-2xl font-bold paper">
          <h1>אין סיסמאות</h1>
          <Button variant={'secondary'} className="mt-4 hover:scale-110 transform transition-transform text-white">
            <Link
              href="/passwords/new-password"
              className=" flex gap-2 items-center justify-center"
            >
              הוסף סיסמא
              <PlusIcon />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2  gap-x-4 gap-y-4 bg-white border shadow-md p-6 rounded-xl flex-grow   ">
          {passwords.map((group) => {
            return (
              <div
                className=" w-5/6 max-w-80 aspect-[1.3/1] m-auto col-span-1 row-span-1 "
                key={group[0]}
              >
                <PasswordGroup groupName={group[0]} list={group[1]} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
