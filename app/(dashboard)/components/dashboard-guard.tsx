import React from 'react';
import DashboardCard from './dashboard-card';
import { getGuards } from '@/lib/db/DBEmployee';
import { Route, routes } from '@/lib/utils/routes';

const DashboardGuard = async () => {
  const guards = await getGuards({
    guard: {
      OR: [
        {
          nextCourse: null
        },
        {
          nextCourse: {
            lte: new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 2,
              new Date().getDate()
            )
          }
        }
      ]
    }
  });

  const renderGuards = guards.data?.map((guard) => {
     return (
          <div
            className="border border-separate rounded-lg mb-4 px-4 py-1 shadow-md"
            key={guard.employeeId}
          >
            <p
              className={'font-semibold'}
            >
              {guard.firstName} {guard.lastName}
            </p>
            <p>
              <span className='font-semibold'>תוקף אישור:{' '}</span>
              {guard.guard?.nextCourse?.toLocaleDateString('en-gb')||'לא עשה קורס'}
            </p>
          </div>
        );
  });

  return (
    <DashboardCard
      body={renderGuards}
      header={`בעיות הסמכה (${guards.data?.length})`}
      route={{ name: 'מאבטחים', path: '/employees/guards' } as Route}
    />
  );
};

export default DashboardGuard;
