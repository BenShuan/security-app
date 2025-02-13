import { Prisma } from '@prisma/client';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import React from 'react';
import { cn } from '@/lib/utils/tailwind';


interface GuardCardDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  guard: Prisma.EmployeeGetPayload<{
    include: {
      guard: true;
    };
  }>;
}

function GuardCardDetails({
  guard,
  className,
  ...props
}: GuardCardDetailsProps) {
  return (
    <div className={cn(" flex flex-col gap-2 ", className)} {...props}>
      <p className="text-sm inline-flex items-center gap-2">
        <Shield className="w-4 h-4" />{'תוקף רישיון: '}
        {guard?.guard?.nextCourse
          ? format(guard?.guard?.nextCourse, 'dd/MM/yyyy')
          : 'לא נקבע'}
      </p>
      <p className="text-sm  ">
        <a className="flex items-center gap-2" href={`mailto:${guard.email}`}>
          <Mail className="w-4 h-4" /> {guard.email}
        </a>
      </p>
      <p className="text-sm  ">
        <a
          className="flex items-center gap-2"
          href={`tel:${guard.phoneNumber}`}
        >
          <Phone className="w-4 h-4" /> {guard.phoneNumber}
        </a>
      </p>
      <p className="text- ">
        <a
          className="flex items-center gap-2"
          target="_blank"
          href={`https://maps.google.com/?q=${guard.address}`}
        >
          <MapPin className="w-4 h-4" /> {guard.address}
        </a>
      </p>
    </div>
  );
}

export default GuardCardDetails;
