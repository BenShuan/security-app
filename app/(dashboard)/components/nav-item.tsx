'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavItem({
  href,
  label,
  isAuth,
  children
}: {
  href: string;
  label: string;
  isAuth:boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Tooltip >
      <TooltipTrigger asChild className={`${!isAuth&&'hidden'}`}>
        <Link
          href={href}
          className={clsx(
            'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
            {
              'bg-foreground text-white hover:text-secondary': pathname.includes(href) && href !== '/' || pathname === href
            }

          )}
        >
          {children}
          <span className="sr-only">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}
