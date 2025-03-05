import { PrismaClient, Role } from '@prisma/client';
import { getSession, requireAuth } from './auth';
import { addSiteFilter } from './db/utils';
import { RoleArray, SiteArray, SiteArrayType } from './schemes';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({

    query: {
      employee: {
        async $allOperations({ args, model, operation, query }) {
          const user = await requireAuth();

          const addFilter = {
            site: user.site
          };
          args = addSiteFilter(operation, args, addFilter);
          return query(args);
        }
      },
      guard: {
        async $allOperations({ args, model, operation, query }) {
          const user = await requireAuth();

          const addFilter = {
            employee: {
              site: user.site
            }
          };
          args = addSiteFilter(operation, args, addFilter);

          return query(args);
        }
      },
      password: {
        async $allOperations({ args, model, operation, query }) {
          const user = await requireAuth();

          const addFilter = {
            site: user.site
          };
          args = addSiteFilter(operation, args, addFilter);

          return query(args);
        }
      },
      key: {
        async $allOperations({ args, model, operation, query }) {
          const user = await requireAuth();

          const addFilter = {
            site: user.site
          };
          args = addSiteFilter(operation, args, addFilter);

          return query(args);
        }
      },
      keyLog: {
        async $allOperations({ args, model, operation, query }) {
          const user = await requireAuth();

          const addFilter = {
            key: {
              site: user.site
            }
          };
          args = addSiteFilter(operation, args, addFilter);

          return query(args);
        }
      },
      contractor: {
        async $allOperations({ args, model, operation, query }) {
          const user = await requireAuth();

          const addFilter = {
            employee: {
              site: user.site
            }
          };
          args = addSiteFilter(operation, args, addFilter);

          return query(args);
        }
      },
      user: {
        async $allOperations({ args, model, operation, query }) {
          try {
            const user = await getSession();

            const addFilter = {} as any;
            if (user) {
              const position = RoleArray.options.indexOf(
                user.role || RoleArray.enum['guard']
              );
              addFilter.role = {
                in: RoleArray.options.filter(
                  (val, ind) => ind <= position
                ) as Role[]
              };
              addFilter.site = {
                in: user.role !== Role.admin ? [user?.site] : SiteArray.options
              };
            }
            args = addSiteFilter(operation, args, addFilter);

            return query(args);
          } catch (err) {
            console.log('err', err);
            return query(args);
          }
        }
      }
    }
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

export default prisma;
