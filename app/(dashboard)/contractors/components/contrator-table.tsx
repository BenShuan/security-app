import { DataTable } from '@/components/ui/table/data-table';
import { getContractors } from '@/lib/db/DBContractors';
import React from 'react';
import { columns } from './colums';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

async function ContractorsTable() {
  const contractors = await getContractors();


  const addButton = (
    <Button
      variant="secondary"
      className="rounded-full bg-secondary text-white flex items-center gap-2 px-4 py-2"
      asChild
    >
      <Link href="/contractors/new-contractor">
        הוסף קבלן
        <PlusIcon />
      </Link>
    </Button>
  );

  return (
    <div className="w-full bg-white rounded-md border p-4 hidden md:block">
      <DataTable columns={columns} data={contractors} addButton={addButton} />
    </div>
  );
}

export default ContractorsTable;
