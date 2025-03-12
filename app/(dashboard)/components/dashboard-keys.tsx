import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getAllKeyLogs, getAllKeys } from '@/lib/db/DBKey';
import { cn } from '@/lib/utils/tailwind';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import DashboardCard from './dashboard-card';
import { routes } from '@/lib/utils/routes';

const DashboardKeys = async () => {
  const keys = await getAllKeyLogs({ retrievedAt: null });

  const renderKeys = keys.map((keyLog) => {

    return (
      <div
        className="border border-separate rounded-lg mb-4 px-4 py-1 shadow-md"
        key={keyLog.id}
      >
        <p
          className={cn(
            'font-semibold flex justify-between',
          )}
        >
          משאיל: {keyLog.employee.firstName} {keyLog.employee.lastName}
          <span className='italic font-semibold text-muted-foreground'>מפתח מס' {keyLog.keyNumber}</span>
        </p>
        <p>
          מחלקה:{' '}
          {keyLog.employee.department}
        </p>
        <p>
          תאריך הנפקה:{' '}
          {keyLog.keyOut.toLocaleDateString('en-gb')}
        </p>
      </div>
    );
  })

  return (

    <DashboardCard
    body={renderKeys}
    header={`מפתחות בהשאלה (${keys.length})`}
    route={routes.find((route) => route.name === 'מפתחות')!}
    />

  );
};

export default DashboardKeys;
