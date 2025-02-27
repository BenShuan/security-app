import ContractorsTable from './components/contrator-table';
import NewContractorForm from './components/new-contractor-form';
import SearchContractorForm from './components/search-contractor-form';
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

      </div>
    </div>
  );
}
