import Image from 'next/image';
import logo from '../assets/images/security-logo-wide - Copy.png';
import logoMobile from '../assets/images/security-logo-no-slogen.png';
import { DayTime } from './daytime';
import { User } from 'app/(dashboard)/components/user';
import Link from 'next/link';

export async function AppBar() {
  return (
    <header className="fixed w-full top-0 z-30 flex h-20 items-center gap-4 border-b bg-foreground justify-between px-4 sm:border-0 sm:px-6">
      <Link href="/">
        <Image
          src={logo.src}
          alt="logo"
          width={150}
          height={50}
          className="hidden md:block"
        />
        <Image
          src={logoMobile.src}
          alt="logo"
          width={50}
          height={50}
          className="block md:hidden"
        />
      </Link>

      <h1 className="text-2xl md:text-3xl font-bold text-white absolute left-1/2  -translate-x-1/2 text-center ">
        מחלקת ביטחון
      </h1>
      <div className='flex-1'></div>
        <DayTime className="hidden md:block" />

      <User />
    </header>
  );
}
