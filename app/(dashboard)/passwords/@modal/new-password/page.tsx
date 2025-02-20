'use client'
import Modal from '@/components/modal';
import PasswordForm from '../../components/password-form';
import { usePathname, useRouter } from 'next/navigation';

export default  function PasswordModal() {

  const router =useRouter();

  const  pathname  = usePathname();

  const isOpen = pathname === '/passwords/new-password';

  return (
    <>
      <Modal
        title="הוסף סיסמא חדשה"
        open={isOpen}
        onOpenChange={() => router.push('/passwords')}
        className="max-h-[90vh] h-full overflow-y-auto hidden sm:block "
      >
        <PasswordForm />
      </Modal>
    </>
  );
}
