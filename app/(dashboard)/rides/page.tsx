import CompanyNumbers from './components/company-numbers';
import RideLogsTable from './components/ride-logs-table';

export default async function RidePage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 hidden md:flex">מפתחות</h1>

      <div className="flex gap-4 flex-grow">
        <div className="paper w-1/4 h-full">
          <div>
            <h1 className="text-2xl font-bold">מספרי חברה</h1>
            
          </div>

          <CompanyNumbers />
        </div>
        <RideLogsTable />
      </div>
    </>
  );
}
