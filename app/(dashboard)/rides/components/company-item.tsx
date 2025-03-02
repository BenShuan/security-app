import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table
} from '@/components/ui/table/table';
import { deleteRideCompanyctAction, deleteRideContactAction } from '@/lib/actions/ridesActions';
import { Prisma, RideCompany, Role } from '@prisma/client';
import { Phone, Trash2 } from 'lucide-react';
import React from 'react';
import CompanyContactForm from './company-contact-form';
import { checkManeger } from '@/lib/actions/auth';
import ContactItem from './contact-item';
import DeleteCompanyButton from './delete-company-button';

const CompanyItem = async ({
  company
}: {
  company: Prisma.RideCompanyGetPayload<{ include: { RidesContacts: true } }>;
}) => {
  const isAdmin = await checkManeger();
  return (
    <AccordionItem
      value={company.name}
      className="shadow-md px-4 border rounded-xl w-full mt-2 relative "
    >
      <AccordionTrigger className="group">
        <p>
          {company.name} -{' '}
          <span className="text-muted-foreground text-sm italic">
            {company.areas}
          </span>
        </p>
        {isAdmin && (
          <DeleteCompanyButton companyName={company.name} />
        )}
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
            {company.RidesContacts.map((cont) => {
              return (
               <ContactItem key={cont.id} contact={cont} />
              );
            })}
            {isAdmin && <CompanyContactForm companyName={company.name} />}
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CompanyItem;
