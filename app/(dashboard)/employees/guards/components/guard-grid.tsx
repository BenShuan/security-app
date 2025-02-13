import { getGuards } from '@/lib/db/DBEmployee';
import GuardCard from './guard-card';
import { Employee, Guard, Prisma } from '@prisma/client';

async function GuardGrid() {
  const guards = await getGuards();


  console.log(guards);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {guards?.success ? (
        guards?.data?.map((guard: Prisma.EmployeeGetPayload<{
          include: {
            guard: true;
          };
        }>) => <GuardCard key={guard.id} guard={guard} />)
      ) : (
        // <div className="text-red-500">{guards?.error}</div> 
        <div className="text-red-500">לא ניתן להציג את המאבטחים</div>
      )}
    </div>
  );
}

export default GuardGrid;
