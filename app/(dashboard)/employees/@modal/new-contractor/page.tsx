'use client';

import Modal from '@/components/modal';
import NewContractorForm from '../../components/new-contractor-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';

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
