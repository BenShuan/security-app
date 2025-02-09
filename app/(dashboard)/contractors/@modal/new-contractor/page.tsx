'use client';

import Modal from '@/components/modal';
import NewContractor from '../../new-contractor';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';


export default function ContractorModal() {
  const router = useRouter();
  const path = usePathname();

  return (
    <Modal title="הוסף קבלן חדש" open={path === '/contractors/new-contractor'} onOpenChange={() => router.push('/contractors')}>
      <NewContractor />
    </Modal>
  );

}

