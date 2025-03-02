import DashboardHeader from '../components/dashboard-header';
import CarsTable from './components/car-table';
import SearchCarForm from './components/search-car-form';

export default async function CarsPage() {
  return (
    <>
      <DashboardHeader />
      <CarsTable />
      <div className="paper md:hidden">
        <SearchCarForm />
      </div>
    </>
  );
}
