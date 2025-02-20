'use client';

import Modal from '@/components/modal';
import NewContractorForm from '../../components/new-employee-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import NewEmployeeForm from '../../components/new-employee-form';

export default function ContractorModal() {
  const router = useRouter();
  const path = usePathname();

  const isOpen = path === '/employees/new-employee';

  return (
    <>
      <Modal
        title="הוסף עובד חדש"
        open={isOpen}
        onOpenChange={() => router.push('/employees')}
        className="max-h-[90vh] h-full overflow-y-auto hidden sm:block "
      >
        <NewEmployeeForm />
      </Modal>
    </>
  );
}
