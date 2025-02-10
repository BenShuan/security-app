'use client';

import Modal from '@/components/modal';
import NewContractorForm from '../../new-contractor-form';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useScreenSize } from '@/lib/utils/hooks/useScreenSize';
import Link from 'next/link';
import { ChevronLeft, MoveLeft } from 'lucide-react';
import { cn } from '@/lib/utils/tailwind';

export default function ContractorModal() {


  const router = useRouter();
  const path = usePathname();

  const isOpen = path === '/contractors/new-contractor';


  return (
    <>

     <Modal
          title="הוסף קבלן חדש"
          open={isOpen}
          onOpenChange={() => router.push('/contractors')}
          className="max-h-[90vh] h-full overflow-y-auto hidden sm:block "

      >
          <NewContractorForm />
      </Modal>


    </>
  );
}