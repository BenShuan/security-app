import Link from 'next/link';

export default function RidesLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <section className='flex flex-col gap-4 h-full p-4'>
        {children}
        {modal}
    </section>
  );
}
