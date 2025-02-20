import NewContractorForm from './components/new-employee-form';
import SearchContractorForm from './components/search-contractor-form';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import { Suspense } from 'react';
import EmployeesTable from './components/employees-table';

export default async function EmployeesPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 hidden md:block">מפתחות</h1>
      <EmployeesTable />
    </>
  );
}
