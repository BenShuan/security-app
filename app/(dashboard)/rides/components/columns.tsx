'use client';

import { Header } from '@/components/ui/table/header';
import { ColumnDef } from '@tanstack/react-table';
import ContractorActions from './keys-actions-icon';
import { Employee, Key, Prisma } from '@prisma/client';
import EmployeeActions from './keys-actions-icon';
import { Checkbox } from '@/components/ui/checkbox';

export const rideLogsColomns: ColumnDef<
  Prisma.RideLogGetPayload<{ include: { guard:{include:{employee:true}},employee: {
    include:{
      manager:true
    }
  } } }>
>[] = [
  {
    accessorKey: 'employee.firstName',

    id: 'שם עובד',
    header: ({ column }) => <Header column={column} title="שם עובד" />,
    cell:({row})=>`${row.original.employee.firstName} ${row.original.employee.lastName}`
  },
  {
    accessorKey: 'employee.department',
    id: 'מחלקה',
    header: ({ column }) => <Header column={column} title="מחלקה" />
  },
  {
    accessorKey: 'rideCompanyName',
    id: 'חברת הסעות',
    header: ({ column }) => <Header column={column} title="חברת הסעות" />,
  },
  {
    accessorKey: 'action',
    id: 'פעולה',
    header: ({ column }) => <Header column={column} title="פעולה" />
  },
  {
    accessorKey: 'reason',
    id: 'סיבה',
    header: ({ column }) => <Header column={column} title="סיבה" />
  }, 
    {
    accessorKey: 'createdAt',
    id: 'תאריך',
    header: ({ column }) => <Header column={column} title="תאריך" />,
    cell:({row})=>row.original.createdAt.toLocaleString('en-gb')
  }, 
  {
    accessorKey: 'employee.manager.firstName',
    id: 'מנהל',
    header: ({ column }) => <Header column={column} title="מנהל" />
  },
  {
    accessorKey: 'guard.employee.firstName',
    id: 'מאבטח מטפל',
    header: ({ column }) => <Header column={column} title="מאבטח" />
  },
  // {
  //   accessorKey: 'actions',
  //   header: ({ column }) => (
  //     <div className={'flex items-center space-x-2'}>
  //       <p>פעולות</p>
  //     </div>
  //   ),
  //   id: 'פעולות',
  //   cell: ({ row }) => {
  //     return <EmployeeActions row={row} />;
  //   }
  // }
];
