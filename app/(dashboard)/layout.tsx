import Link from 'next/link';
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelRight,
  ShoppingCart,
  Users2
} from 'lucide-react';



import { Button } from '@/components/ui/button';


import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Analytics } from '@vercel/analytics/react';
import Providers from './providers';
import { AppBar } from '@/components/appbar';
import  DesktopNav  from './components/desktop-nav';
import { Toaster } from '@/components/ui/toast';






export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="flex min-h-screen flex-col ">
        <div className='h-20 w-full'>
          <AppBar />


          <DesktopNav />

        </div>
          <main className="grid flex-grow items-start gap-2 p-4 md:mr-14 sm:px-6 sm:py-0 md:gap-4  ">
            {children}
          </main>
          <Toaster duration={2000} />
        <Analytics />
      </main>
    </Providers>


  );
}


function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelRight className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Vercel</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Users2 className="h-5 w-5" />
            Customers
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
