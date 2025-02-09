import { Route } from '@/lib/utils/routes';
import { NavItem } from './nav-item';
import Link from 'next/link';

export function RouteItem({ route }: { route: Route }) {
  return (
    <Link
      href={route.path}
      className="flex items-center gap-2 h-full bg-gradient-to-r from-[#003B50] to-[#0A1126] text-white p-4
      lg:hover:scale-105 transition-all duration-300 rounded-3xl "
    >
      <div className="flex items-center justify-center gap-4 w-full h-full [&>svg]:w-10 [&>svg]:h-10  ">
        {route.icon}
        <p>{route.name}</p>
      </div>
    </Link>
  );
}
