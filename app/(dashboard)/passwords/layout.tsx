
export default function EmployeesLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <section className='flex flex-col gap-4 flex-grow  p-4 relative'>
        {children}
        {modal}
    </section>
  );
}
