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
    
    </div>
  );
}

export default CarsTable;
