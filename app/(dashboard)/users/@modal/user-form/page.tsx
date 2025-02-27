'use client';

import Modal from '@/components/modal';
import UserForm from '../../components/user-form';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function ContractorModal() {
  const router = useRouter();
  const path = usePathname();

  const isOpen = path === '/users/user-form';

  return (
    <>
      <Modal
        title="הוסף קבלן חדש"
        open={isOpen}
        onOpenChange={() => router.push('/users')}
        className="max-h-[90vh] h-full overflow-y-auto hidden sm:block "
      >
        <UserForm />
      </Modal>
    </>
  );
}
