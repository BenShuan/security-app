import { DataTable } from '@/components/ui/table/data-table';
import React from 'react';
import { columns } from './colums';
import { getAllCars } from '@/lib/db/DBCars';
import UpdateCarsButton from './update-car-button';


async function CarsTable() {

  const cars = await getAllCars();

  

  return (
    <div className="w-full bg-white rounded-md border p-4 hidden md:block  ">
        <DataTable columns={columns} data={cars} addButton={<UpdateCarsButton />} />
      {/* <div className='block md:hidden'>
        <h1 className='text-2xl font-bold mb-4'>חפש עובד</h1>
        <NewEmployeeForm />
      </div> */}
    
    </div>
  );
}

export default CarsTable;
