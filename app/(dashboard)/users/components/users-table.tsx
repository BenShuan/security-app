import { DataTable } from '@/components/ui/table/data-table';
import React from 'react';
import { columns } from './colums';
import { getAllUsers } from '@/lib/db/DBUsers';
import AddUserButton from './add-user-button';

async function UsersTable() {
  const users = await getAllUsers();

 

  return (
    <div className="w-full bg-white rounded-md border p-4 hidden md:block">
      <DataTable columns={columns} data={users} addButton={<AddUserButton/>} />
    </div>
  );
}

export default UsersTable;
