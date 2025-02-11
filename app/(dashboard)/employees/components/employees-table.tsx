import { DataTable } from '@/components/ui/table/data-table';
import React from 'react';
import { FileScanIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllEmployees } from '@/lib/db/DBEmployee';
import { columns } from './colums';
import UpdateEmployeesButton from './update-employees-button';

async function EmployeesTable() {
  const employees = await getAllEmployees();


  return (
    <div className="w-full bg-white rounded-md border p-4 hidden md:block">
      <DataTable columns={columns} data={employees} addButton={<UpdateEmployeesButton />} />
    </div>
  );
}

export default EmployeesTable;
