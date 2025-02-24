import { DataTable } from '@/components/ui/table/data-table';
import React, { ReactNode } from 'react';
import { FileScanIcon, KeyIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllEmployees } from '@/lib/db/DBEmployee';
import { statusColumns } from './status-columns';
import { getAllKeys } from '@/lib/db/DBKey';
import Link from 'next/link';
import AddNewKey from './add-new-key';
import KeyForm from './key-form';

async function KeysStatusTable() {
  const keys = await getAllKeys();

  return (
    <div className="w-full bg-white rounded-md border p-4 ">
      <div className="hidden md:block">
        <DataTable
          columns={statusColumns}
          data={keys}
          addButton={<AddNewKey />}
        />
      </div>
      <div className="block md:hidden">
        <h1 className="text-2xl font-bold mb-4">הוסף מפתח</h1>
        <KeyForm />
      </div>
    </div>
  );
}

export default KeysStatusTable;
