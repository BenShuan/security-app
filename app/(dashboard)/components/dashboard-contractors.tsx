import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getContractors } from '@/lib/db/DBContractors';
import { cn } from '@/lib/utils/tailwind';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import DashboardCard from './dashboard-card';
import { routes } from '@/lib/utils/routes';

const Dashboardcontractors = async () => {
  const constractors = await getContractors();

  const renderContractors =constractors.map((contractor) => {
    const notAhuthorized =
      new Date(contractor.authExpiryDate) < new Date();

    return (
      <div
        className="border border-separate rounded-lg mb-4 px-4 py-1 shadow-md"
        key={contractor.id}
      >
        <p
          className={cn(
            'font-semibold',
            notAhuthorized && 'text-destructive'
          )}
        >
          {contractor.employee.firstName} {contractor.employee.lastName}
        </p>
        <p>
          <span className='font-semibold'>תוקף אישור:{' '}</span>
          {contractor.authExpiryDate.toLocaleDateString('en-gb')}
        </p>
        <p>
          <span className='font-semibold'>תאריך התחלה:{' '}</span>
          {contractor.authExpiryDate.toLocaleDateString('en-gb')}
        </p>
      </div>
    );
  })

  return (
    <DashboardCard
    body={renderContractors}
    header={`קבלנים ללא אישור קבוע (${constractors.length})`}
    route={routes.find((route) => route.name === 'קבלנים')!}
    />
  );
};

export default Dashboardcontractors;
