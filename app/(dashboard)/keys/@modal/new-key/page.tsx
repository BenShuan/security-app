'use client';

import Modal from '@/components/modal';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import KeyForm from '../../components/key-form';

export default function KeyModal() {
  const router = useRouter();
  const path = usePathname();

  const isOpen = path === '/keys/new-key';

  return (
    <>
      <Modal
        title="הוסף מפתח חדש"
        open={isOpen}
        onOpenChange={() => router.push('/keys')}
        className="max-h-[90vh] h-full overflow-y-auto hidden sm:block "
      >
        <KeyForm/>
      </Modal>
    </>
  );
}
