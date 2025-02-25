import { Accordion } from '@/components/ui/accordion';
import { getAllRidesCompanies } from '@/lib/db/DBRides';
import CompanyItem from './company-item';
import ModalButton from '@/components/modal-button';
import RideCompanyForm from './ride-company-form';

async function CompanyNumbers() {
  
  const contacts = await getAllRidesCompanies();

  return (
    <Accordion type="single" collapsible className="w-full max-h-full flex-grow overflow-scroll">
      {contacts.map((comp) => {
        return <CompanyItem company={comp} key={comp.name} />;
      })}
    </Accordion>
  );
}

export default CompanyNumbers;
