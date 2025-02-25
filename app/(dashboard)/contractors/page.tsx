import { Button } from '@/components/ui/button';
import ContractorsTable from './components/contrator-table';
import { createContractorAction } from '@/lib/actions/contractorsActions';
import NewContractorForm from './components/new-contractor-form';
import SearchContractorForm from './components/search-contractor-form';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import { Suspense } from 'react';
import DashboardHeader from '../components/dashboard-header';

export default async function ContractorsPage() {
  return (
    <div className="p-4 ">
      <DashboardHeader/>
      <ContractorsTable />
      <div className="paper md:hidden">
        <Tabs defaultValue="contractors" className="w-full ">
          <TabsList>
            <TabsTrigger value="contractors">חפש עובד</TabsTrigger>
            <TabsTrigger value="new-contractor">הוסף/עדכן עובד </TabsTrigger>
          </TabsList>
          <Suspense
            fallback={
              <div className="w-full h-full flex justify-center items-center skeleton">
                Loading...
              </div>
            }
          >
            <TabsContent dir="rtl" value="contractors">
              <SearchContractorForm />
            </TabsContent>

            <TabsContent dir="rtl" value="new-contractor">
              <NewContractorForm />
            </TabsContent>
          </Suspense>
        </Tabs>

        {/* <h1 className="text-2xl font-bold my-4 flex justify-between w-full gap-4 items-center">חפש קבלן
          <Link href="/contractors/new-contractor" className='rounded-full shadow-md bg-secondary p-2 text-white'><PlusIcon/></Link>
        </h1>
        <SearchContractorForm /> */}
      </div>
    </div>
  );
}
