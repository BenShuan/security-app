import { Button } from '@/components/ui/button';
import ContractorsTable from './contrator-table';
import { createContractorAction } from '@/lib/actions/contractors';
import NewContractorForm from './new-contractor-form';
import SearchContractorForm from './search-contractor-form';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';

export default async function ContractorsPage() {
  return (
    <div className="pb-4 ">
      <h1 className="text-3xl font-bold my-4 hidden md:block">עובדי קבלן</h1>
      <ContractorsTable />
      <div className="paper md:hidden">
        <Tabs defaultValue="contractors" className='w-full' >
          <TabsList>
            <TabsTrigger value="contractors">חפש עובד</TabsTrigger>
            <TabsTrigger value="new-contractor">הוסף/עדכן עובד </TabsTrigger>

          </TabsList>

          <TabsContent dir='rtl'  value="contractors">
            <SearchContractorForm />
          </TabsContent>
          <TabsContent dir='rtl'  value="new-contractor">

            <NewContractorForm />
          </TabsContent>
        </Tabs>

        {/* <h1 className="text-2xl font-bold my-4 flex justify-between w-full gap-4 items-center">חפש קבלן
          <Link href="/contractors/new-contractor" className='rounded-full shadow-md bg-secondary p-2 text-white'><PlusIcon/></Link>
        </h1>
        <SearchContractorForm /> */}
      </div>
    </div>
  );
}
