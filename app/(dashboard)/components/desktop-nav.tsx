import { TooltipContent } from '@/components/ui/tooltip';

import { Settings } from 'lucide-react';

import { TooltipTrigger } from '@/components/ui/tooltip';

import logoMobile from '../../../assets/images/security-logo-no-slogen.png';

import Link from 'next/link';
import { NavItem } from './nav-item';
import { Tooltip } from '@/components/ui/tooltip';
import Image from 'next/image';
import { routes } from '@/lib/utils/routes';
import { requireAuth } from '@/lib/auth';
import { checkManeger } from '@/lib/actions/auth';

export default async function DesktopNav() {
  const user = await requireAuth();
  return (
    <aside className="fixed inset-y-0 right-0 z-10 hidden w-14 flex-col border-r pt-20 bg-muted md:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Image src={logoMobile.src} alt="logo" width={18} height={18} />
          <span className="sr-only">מחלקת ביטחון</span>
        </Link>

        {routes.map((route) => (
          <NavItem
            key={route.path}
            href={route.path}
            label={route.name}
            isAuth={route.permition?.includes(user.role)}
          >
            {route.icon}
          </NavItem>
        ))}
      </nav>
    </aside>
  );
}
