import NewContractorForm from './components/new-employee-form';
import SearchContractorForm from './components/search-contractor-form';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import { Suspense } from 'react';
import EmployeesTable from './components/employees-table';
import DashboardHeader from '../components/dashboard-header';

export default async function EmployeesPage() {
  return (
    <>
      <DashboardHeader />
      <EmployeesTable />
    </>
  );
}
