'use client';

import { Header } from '@/components/ui/table/header';
import { ColumnDef } from '@tanstack/react-table';
import ContractorActions from './employees-actions-icons';
import { Employee } from '@prisma/client';
import EmployeeActions from './employees-actions-icons';

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'idNumber',

    id: 'ת.ז',
    header: ({ column }) => <Header column={column} />
  },
  {
    accessorKey: 'firstName',
    id: 'שם פרטי',
    header: ({ column }) => <Header column={column} />
  },
  {
    accessorKey: 'lastName',
    id: 'שם משפחה',
    header: ({ column }) => <Header column={column} />
  },
  {
    accessorKey: 'employeeId',
    id: 'מספר עובד',
    header: ({ column }) => <Header column={column} />
  },
  {
    accessorKey: 'phoneNumber',
    id: 'טלפון',
    header: ({ column }) => <Header column={column} />
  },
  {
    accessorKey: 'department',
    id: 'מחלקה',
    header: ({ column }) => <Header column={column} />
  },
  {
    accessorKey: 'position',
    id: 'תפקיד',
    header: ({ column }) => <Header column={column} />
  },
  {
    accessorKey: 'site',
    id: 'אתר',
    header: ({ column }) => <Header column={column} />
  },
  {
    accessorKey: 'actions',
    id: 'פעולות',
    header: ({ column }) => <Header column={column} />,
    cell: ({ row }) => {
      return <EmployeeActions row={row} />;
    }
  }
];
