'use client';

import Modal from '@/components/modal';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import KeyForm from '../../components/ride-log-form';
import AddNewRideLog from '../../components/add-new-ridelog';
import RideLogForm from '../../components/ride-log-form';

export default function KeyModal() {
  const router = useRouter();
  const path = usePathname();

  const isOpen = path === '/rides/new-ridelog';

  return (
    <>
      <Modal
        title="הוסף נסיעה חדשה"
        open={isOpen}
        onOpenChange={() => router.push('/rides')}
        className="max-h-[90vh] h-full overflow-y-auto hidden sm:block "
      >
        <RideLogForm />
      </Modal>
    </>
  );
}
