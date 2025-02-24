'use client';

import { Header } from '@/components/ui/table/header';
import { ColumnDef } from '@tanstack/react-table';
import ContractorActions from './keys-actions-icon';
import { Employee, Key, Prisma } from '@prisma/client';
import EmployeeActions from './keys-actions-icon';
import { Checkbox } from '@/components/ui/checkbox';

export const statusColumns: ColumnDef<
  Prisma.KeyGetPayload<{ include: { keyLog: true } }>
>[] = [
  {
    accessorKey: 'keyNumber',

    id: 'מספר מפתח',
    header: ({ column }) => <Header column={column} title="מספר מפתח" />
  },
  {
    accessorKey: 'description',
    id: 'תיאור',
    header: ({ column }) => <Header column={column} title="תיאור" />
  },
  {
    accessorKey: 'keyLog.0.retrievedAt',
    id: 'נמצא?',
    header: ({ column }) => <Header column={column} title="נמצא?" />,
    cell: ({ row }) => (
      <Checkbox
        className={`${row.original.keyLog[0]?.retrievedAt === null && 'border-destructive border-2 '} cursor-default shadow-md   `}
        checked={row.original.keyLog[0]?.retrievedAt !== null}

      />
    )
  },
  {
    accessorKey: 'keyLog.0.employee.firstName',
    id: 'עובד',
    header: ({ column }) => <Header column={column} title="מחזיק המפתח" />
  },
  {
    accessorKey: 'keyLog.0.employee.department',
    id: 'מחלקה',
    header: ({ column }) => <Header column={column} title="מחלקה" />
  },
  {
    accessorKey: 'actions',
    header: ({ column }) => (
      <div className={'flex items-center space-x-2'}>
        <p>פעולות</p>
      </div>
    ),
    id: 'פעולות',
    cell: ({ row }) => {
      return <EmployeeActions row={row} />;
    }
  }
];
