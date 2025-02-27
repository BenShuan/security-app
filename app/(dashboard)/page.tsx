import { routes } from '@/lib/utils/routes';
import { RouteItem } from './components/route-item';
import { cn } from '@/lib/utils/tailwind';
import { requireAuth } from '@/lib/auth';

export default async function HomePage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {

  const user = await requireAuth()
  return (
    <section className="h-full w-full">
      <ul className="flex flex-wrap gap-4 w-full h-full py-2">
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
      </ul>
    </section>
  );
}
