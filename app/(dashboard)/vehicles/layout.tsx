
export default function EmployeesLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex flex-col gap-4 h-full p-4'>
        {children}
    </section>
  );
}
