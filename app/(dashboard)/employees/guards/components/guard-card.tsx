import { Button } from '@/components/ui/button';
import { Guard, Prisma } from '@prisma/client';
import { Mail, MapPin, Phone, Shield, User } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import guardImage from '../../../../../assets/images/security-logo-no-slogen.png';
import { format } from 'date-fns';
import Link from 'next/link';
import GuardCardDetails from './guard-card-details';

function GuardCard({ guard }: { guard: Prisma.EmployeeGetPayload<{
  include: {
    guard: true;
  };
}> }) {
  return (
    <div className="bg-white p-4 rounded-xl aspect-[1/1.2] relative overflow-hidden shadow-md group ">
      <Image
        src={guardImage}
        alt={guard.firstName}
        fill
        className="w-full h-full object-cover rounded-md"
      />

      <div className="absolute -bottom-[56%] h-3/4 group-hover:bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/100 via-foreground/90 via-75% to-transparent text-white transition-all duration-300">
        <h2 className="text-lg font-bold flex items-center justify-between h-1/4 pb-3">
          {guard.firstName} {guard.lastName}
          <Button variant="ghost" size="icon" className="">
            <Link href={`/employees/guards/${guard.employeeId}`}>
              <User />
            </Link>
          </Button>
        </h2>
        <GuardCardDetails className="h-3/4 sm text-slate-200" guard={guard} />
      </div>
    </div>
  );
}

export default GuardCard;
