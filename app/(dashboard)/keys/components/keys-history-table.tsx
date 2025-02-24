import { DataTable } from '@/components/ui/table/data-table';
import React from 'react';
import { getAllKeyLogs } from '@/lib/db/DBKey';
import AddNewKey from './add-new-key';
import KeyForm from './key-form';
import { historyColumns } from './history-columns';

async function KeysHistoryTable() {
  const keys = await getAllKeyLogs();

  return (
    <div className="w-full bg-white rounded-md border p-4 ">
      <div className="hidden md:block">
        <DataTable
          columns={historyColumns}
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

export default KeysHistoryTable;
