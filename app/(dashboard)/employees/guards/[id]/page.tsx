import prisma from '@/lib/prisma';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import GuardCard from '../components/guard-card';
import GuardCardDetails from '../components/guard-card-details';
import { Prisma } from '@prisma/client';
import Image from 'next/image';
import guardImage from '../../../../../assets/images/security-logo-no-slogen.png';
async function GuardPage({ params }: { params: Promise<{ id: string }> }) {

  const {id} =  await params;

  if (!id) {
    return <div>Guard not found</div>;
  }

  const guard = (await prisma.employee.findUnique({
    where: {
      employeeId: id
    },
    include: {
      guard: true
    }
  })) as Prisma.EmployeeGetPayload<{
    include: {
      guard: true;
    };
  }>;
  return (
    <div className="flex flex-col gap-4 h-full">
      <header className="flex items-center gap-2 h-12 ">
        <Link href="/employees/guards">
          <ArrowRight fontVariant="bold" className="w-7 h-7 " />
        </Link>
        <h1 className="text-3xl font-bold">
          {guard?.firstName} {guard?.lastName}
        </h1>
      </header>
      <main className="flex gap-4 rounded-3xl border-2 border-foreground/50 shadow-md w-full flex-1 bg-transparent">
        <div className="w-1/4 flex flex-col gap-4 justify-start items-center p-4 ">
          <div className="relative w-full h-[33%]">
            <Image
              src={guard?.guard?.imageUrl || guardImage}
              alt={guard?.firstName}
              fill
              className="h-full object-contain rounded-md relative border-2 top-0 border-foreground/50"
            />
          </div>
          <GuardCardDetails className="text-black" guard={guard} />
        </div>
      </main>
    </div>
  );
}

export default GuardPage;
