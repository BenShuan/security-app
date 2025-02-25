import { PrismaClient } from '@prisma/client';
import { requireAuth } from './auth';
import { addSiteFilter } from './db/utils';
import { SiteArrayType } from './schemes';

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
          console.log('args', args);
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
