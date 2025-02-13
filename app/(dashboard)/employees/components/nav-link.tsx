'use client';
import { cn } from '@/lib/utils/tailwind';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const navClasses = (path: string) =>
    cn(
      'text-gray-800 font-bold px-4 py-2 rounded-md hover:bg-gray-300 transition-all duration-300 relative',
    isActive(path) && 'after:content-[" "] after:block after:w-1/2 after:-translate-x-1/2  after:h-1 after:bg-gray-800 after:absolute after:bottom-0 after:left-1/2 after:rounded-t-full'
  )

  return (
    <nav className="flex justify-around items-center h-12 bg-gray-100">
     
      <Link
        href="/employees"
        className={navClasses('/employees')}
      >
        עובדי חברה
      </Link>
      <Link
        href="/employees/guards"
          className={navClasses('/employees/guards')}
      >
        מאבטחים
      </Link>
    </nav>
  );
}
