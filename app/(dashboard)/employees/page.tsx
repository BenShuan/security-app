import NewContractorForm from './components/new-contractor-form';
import SearchContractorForm from './components/search-contractor-form';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import { Suspense } from 'react';
import EmployeesTable from './components/employees-table';

export default async function EmployeesPage() {
  return (
    <div className="pb-4  ">
        <Tabs defaultValue="employees" >
          <TabsList className='w-full rounded-none border-none justify-around'>
            <TabsTrigger value="guards">מאבטחים </TabsTrigger>
            <TabsTrigger value="employees">עובדי חברה</TabsTrigger>
          </TabsList>
          <Suspense
            fallback={
              <div className="w-full h-full flex justify-center items-center skeleton">
                Loading...
              </div>
            }
          >
            <div className='p-4'>
              <TabsContent dir="rtl" value="guards">
              
              </TabsContent>
              <TabsContent dir="rtl" value="employees">
              <h1 className="text-3xl font-bold mb-4 hidden md:block">
                  עובדי חברה
                </h1>
                <EmployeesTable />
              </TabsContent>
            </div>
          </Suspense>
        </Tabs>

        {/* <h1 className="text-2xl font-bold my-4 flex justify-between w-full gap-4 items-center">חפש קבלן
          <Link href="/contractors/new-contractor" className='rounded-full shadow-md bg-secondary p-2 text-white'><PlusIcon/></Link>
        </h1>
        <SearchContractorForm /> */}
    </div>
  );
}
