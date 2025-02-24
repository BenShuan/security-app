import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table/table';
import { getAllRidesCompanies } from '@/lib/db/DBRides';
import { Phone } from 'lucide-react';

async function CompanyNumbers() {
  const contacts = await getAllRidesCompanies();

  return (
    <Accordion type="multiple" className="w-full h-full">
      {contacts.map((comp) => {
        return (
          <AccordionItem
            key={comp.name}
            value={comp.name}
            className="shadow-md px-4 border rounded-xl w-full mt-2"
          >
            <AccordionTrigger>
              <p>
                {comp.name} -{' '}
                <span className="text-muted-foreground text-sm italic">
                  {comp.areas}
                </span>
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>שם</TableHead>
                    <TableHead>פלאפון</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {comp.RidesContacts.map((cont) => {
                    return (
                      <TableRow key={cont.id}>
                        <TableCell>{cont.name}</TableCell>
                        <TableCell>{cont.phoneNumber}</TableCell>
                        <TableCell>
                          <Phone className="h-4 w-4" />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export default CompanyNumbers;
