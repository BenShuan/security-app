import { routes } from '@/lib/utils/routes';
import { RouteItem } from './components/route-item';
import { cn } from '@/lib/utils/tailwind';
import { requireAuth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { saltAndHashPassword } from '@/lib/utils/password';
import { Role } from '@prisma/client';
import Dashboardcontractors from './components/dashboard-contractors';
import DashboardKeys from './components/dashboard-keys';
import DashboardGuard from './components/dashboard-guard';

export default async function HomePage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  //Create an admin user
  const admin = await prisma.user.upsert({
    where: {
      userName: 'admin'
    },
    create: {
      email: 'admin@gmai.com',
      password: await saltAndHashPassword('admin123'),
      role: Role.admin,
      site: 'אור עקיבא',
      userName: 'admin',
      isActive: true
    },
    update: {}
  });
  const userManager = await prisma.user.upsert({
    where: {
      userName: 'manager'
    },
    create: {
      email: 'manager@gmai.com',
      password: await saltAndHashPassword('admin123'),
      role: Role.manager,
      site: 'אור עקיבא',
      userName: 'manager',
      isActive: true
    },
    update: {}
  });
  const user = await requireAuth();
  return (
    <section className="h-full w-full grid grid-cols-3 grid-rows-2 p-4 gap-4  ">
      {/* <ul className="flex flex-wrap gap-4 w-full h-full py-2">
        {routes.map((route) => {
          if (route.path === '/') return null;
          return (
            <li
              key={route.path}
              className={cn("w-[90%] h-32 lg:w-[30%] lg:h-56 m-auto *:text-3xl *:font-bold *:text-center",
                  !route.permition.includes(user.role)&&"hidden"
              )}
            >
              <RouteItem route={route} />
            </li>
          );
        })}
      </ul> */}


      <Dashboardcontractors />
      <DashboardKeys/>
      <DashboardGuard/>
    </section>
  );
}
