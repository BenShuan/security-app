import { Button } from '@/components/ui/button';
import ContractorsTable from './contrator-table';
import { createContractorAction } from '@/lib/actions/contractors';

export default async function ContractorsPage() {
  return (
    <div className='pb-4 '>
      <h1 className="text-3xl font-bold my-4">עובדי קבלן</h1>
      <ContractorsTable />
    </div>
  );
}
