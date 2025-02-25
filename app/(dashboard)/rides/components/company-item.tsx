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
import { deleteRideContactAction } from '@/lib/actions/ridesActions';
import { Prisma, RideCompany, Role } from '@prisma/client';
import { Phone, Trash2 } from 'lucide-react';
import React from 'react';
import CompanyContactForm from './company-contact-form';
import { checkManeger } from '@/lib/auth';

const CompanyItem = async ({
  company
}: {
  company: Prisma.RideCompanyGetPayload<{ include: { RidesContacts: true } }>;
}) => {
  const isAdmin = await checkManeger();
  return (
    <AccordionItem
      value={company.name}
      className="shadow-md px-4 border rounded-xl w-full mt-2 relative"
    >
      <AccordionTrigger className="group">
        <p>
          {company.name} -{' '}
          <span className="text-muted-foreground text-sm italic">
            {company.areas}
          </span>
        </p>
        {isAdmin && (
          <Button
            variant={'ghost'}
            className="rounded-full absolute opacity-0 group-hover:opacity-100 -top-4 -left-4 w-fit transition-all duration-300 "
          >
            <Trash2 className="w-4 h-4 text-destructive " />
          </Button>
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
                <TableRow key={cont.id}>
                  <TableCell>{cont.name}</TableCell>
                  <TableCell>{cont.phoneNumber}</TableCell>
                  <TableCell className="flex gap-2 content-center justify-center items-start">
                    <Phone className="h-4 w-4" />
                    <Button
                      variant={'ghost'}
                      className="p-0 h-fit"
                      onClick={deleteRideContactAction.bind(
                        null,
                        cont.phoneNumber
                      )}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
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
