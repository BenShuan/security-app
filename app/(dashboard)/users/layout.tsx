import { checkManeger } from '@/lib/actions/auth';
import { redirect } from 'next/navigation';

export default async function UsersLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const isManager = await checkManeger();

  if (!isManager) {
    redirect('/');
  }

  return (
    <>
      {children}
      {modal}
    </>
  );
}
