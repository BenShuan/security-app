import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Password } from '@prisma/client';
import PasswordItem from './password-item';
import { ExpandIcon, Plus, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/tailwind';

interface PasswordGroupProps {
  list: Password[];
  groupName: string;
}

function PasswordGroup({ list, groupName }: PasswordGroupProps) {



  return (
    <Card className="overflow-hidden h-full flex flex-col shadow-xl    ">
      <CardHeader
        className={`py-4 px-2 bg-accent-foreground text-background flex-row justify-between`}  >
        {groupName}

        <Link
          href={`/passwords/new-password?group=${groupName}`}
          className="hover:scale-110 transform transition-transform"
        >
          <PlusIcon />
        </Link>
      </CardHeader>
      <CardContent className="overflow-scroll flex-grow">
        <ul className="pt-2 ">
          {list.map((pass) => {
            return (
              <li key={pass.id} className="my-1">
                <PasswordItem password={pass} />
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

export default PasswordGroup;
