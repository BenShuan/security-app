import Link from 'next/link';

export default function EmployeesLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <section className='flex flex-col gap-4 h-full'>
      <div className="p-4 flex-grow">
        {children}
        {modal}
      </div>
    </section>
  );
}
