import prisma from '@/lib/prisma';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import GuardCardDetails from '../components/guard-card-details';
import { Prisma } from '@prisma/client';
import guardImage from '../../../../../assets/images/security-logo-no-slogen.png';
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs';
import GuardForm from '../components/guard-form';
import ProfileImage from '../components/profile-image';
import GuardFiles from '../components/guard-files';
async function GuardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    return <div>Guard not found</div>;
  }

  const guard = (await prisma.employee.findUnique({
    where: {
      employeeId: id
    },
    include: {
      guard: {
        include: {
          image: true
        }
      }
    }
  })) as Prisma.EmployeeGetPayload<{
    include: {
      guard:{
        include:{
          image:true
        }
      };
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
        <section className="w-1/4 flex flex-col gap-4 justify-start items-center p-4 ">
          <ProfileImage imageUrl={guard?.guard?.image?.url || guardImage.src} alt={guard?.firstName} />
          <GuardCardDetails className="text-black flex-grow" guard={guard} />
        </section>

        <section className="w-3/4 flex flex-col gap-4 justify-start items-center p-4 ">
          <Tabs defaultValue="details" className="w-full text-left">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="files">קבצים</TabsTrigger>
              <TabsTrigger value="details">פרטים</TabsTrigger>
            </TabsList>
            <TabsContent value="details" dir="rtl">
 
              <GuardForm guard={guard} />
            </TabsContent>
            <TabsContent value="files" dir="rtl">
              <GuardFiles id={id} />
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
}

export default GuardPage;
