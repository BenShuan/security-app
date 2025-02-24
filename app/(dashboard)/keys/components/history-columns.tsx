'use client';

import { Header } from '@/components/ui/table/header';
import { ColumnDef } from '@tanstack/react-table';
import { Prisma } from '@prisma/client';

export const historyColumns: ColumnDef<
  Prisma.KeyLogGetPayload<{ include: { key: true,employee:true, guard:{include:{employee:true}} } }>
>[] = [
  {
    accessorKey: 'keyNumber',

    id: 'מספר מפתח',
    header: ({ column }) => <Header column={column} title="מספר מפתח" />
  },
  {
    accessorKey: 'keyOut',
    id: 'הנפקה',
    header: ({ column }) => <Header column={column} title="הנפקה" />,
    cell:({row})=>row.original.keyOut.toLocaleString("en-gb")
  },
  {
    accessorKey: 'retrievedAt',
    id: 'החזרה',
    header: ({ column }) => <Header column={column} title="החזרה" />,
    cell:({row})=>row.original.retrievedAt?.toLocaleString("en-gb")

   },
  {
    accessorKey: 'employee.firstName',
    id: 'עובד',
    header: ({ column }) => <Header column={column} title="עובד" />
  },
  {
    accessorKey: 'employee.department',
    id: 'מחלקה',
    header: ({ column }) => <Header column={column} title="מחלקה" />
  },
  {
    accessorKey: 'guard.firstName',
    id: 'מאבטח מטפל',
    header: ({ column }) => <Header column={column} title="מאבטח מטפל" />,
    cell:({row})=>`${row.original.guard.employee.firstName} ${row.original.guard.employee.lastName} `
  }
];
