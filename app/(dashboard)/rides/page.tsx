import ModalButton from '@/components/modal-button';
import DashboardHeader from '../components/dashboard-header';
import CompanyNumbers from './components/company-numbers';
import RideLogsTable from './components/ride-logs-table';
import { ListPlus } from 'lucide-react';
import RideCompanyForm from './components/ride-company-form';

export default async function RidePage() {
  return (
    <>
      <DashboardHeader/>
      <div className="flex gap-4 flex-grow ">
        <div className="paper w-1/4 flex flex-col h-full  ">
            <h1 className="text-2xl font-bold">מספרי ספקים</h1>
            

          <CompanyNumbers />
          {<RideCompanyForm/>}
        </div>
        <RideLogsTable />
      </div>
    </>
  );
}
