
import CarsTable from './components/car-table';
import SearchCarForm from './components/search-car-form';

export default async function CarsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 ">רכבי חברה</h1>
      <CarsTable />
      <div className='paper md:hidden'>
        <SearchCarForm/>
      </div>
    </>
  );
}
