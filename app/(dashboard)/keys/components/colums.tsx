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
    header: ({ column }) => <Header column={column} title="ת.ז" />
  },
  {
    accessorKey: 'firstName',
    id: 'שם פרטי',
    header: ({ column }) => <Header column={column} title="שם פרטי" />
  },
  {
    accessorKey: 'lastName',
    id: 'שם משפחה',
    header: ({ column }) => <Header column={column} title="שם משפחה" />
  },
  {
    accessorKey: 'employeeId',
    id: 'מספר עובד',
    header: ({ column }) => <Header column={column} title="מספר עובד" />
  },
  {
    accessorKey: 'phoneNumber',
    id: 'טלפון',
    header: ({ column }) => <Header column={column} title="טלפון" />
  },
  {
    accessorKey: 'department',
    id: 'מחלקה',
    header: ({ column }) => <Header column={column} title="מחלקה" />
  },
  {
    accessorKey: 'position',
    id: 'תפקיד',
    header: ({ column }) => <Header column={column} title="תפקיד" />
  },
  {
    accessorKey: 'site',
    id: 'אתר',
    header: ({ column }) => <Header column={column} title="אתר" />
  },
  // {
  //   accessorKey: 'manager.firstName',
  //   id: 'מנהל',
  //   header: ({ column }) => <Header column={column} title="מנהל" />
  // },
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
