import { DataTable } from '@/components/ui/table/data-table';
import React from 'react';
import { FileScanIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllEmployees } from '@/lib/db/DBEmployee';
import { columns } from './colums';
import UpdateEmployeesButton from './update-employees-button';
import NewEmployeeForm from './new-employee-form';


async function EmployeesTable() {

  const employees = await getAllEmployees();


  return (
    <div className="w-full bg-white rounded-md border p-4 ">
      <div className='hidden md:block'>
        <DataTable columns={columns} data={employees} addButton={<UpdateEmployeesButton />} />
      </div>
      <div className='block md:hidden'>
        <h1 className='text-2xl font-bold mb-4'>חפש עובד</h1>
        <NewEmployeeForm />
      </div>
    
    </div>
  );
}

export default EmployeesTable;
