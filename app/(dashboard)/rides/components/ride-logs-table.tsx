import { DataTable } from '@/components/ui/table/data-table';
import React from 'react';
import AddNewRideLog from './add-new-ridelog';
import { rideLogsColomns } from './columns';
import { getAllRideLogs } from '@/lib/db/DBRides';
import RideLogForm from './ride-log-form';

async function RideLogsTable() {
  const rideLogs = await getAllRideLogs();

  return (
    <div className="w-full bg-white rounded-md border p-4 ">
      <div className="hidden md:block">
        <DataTable
          columns={rideLogsColomns}
          data={rideLogs}
          addButton={<AddNewRideLog />}
        />
      </div>
      <div className="block md:hidden">
        <h1 className="text-2xl font-bold mb-4">הוסף מפתח</h1>
        <RideLogForm />
      </div>
    </div>
  );
}

export default RideLogsTable;
