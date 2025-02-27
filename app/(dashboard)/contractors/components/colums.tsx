

import { Header } from '@/components/ui/table/header';
import { ColumnDef } from '@tanstack/react-table';
import type { Contractor } from 'node_modules/.prisma/client/index.js';
import ContractorActions from './contractor-actions-icons';
import { cn } from '@/lib/utils/tailwind';
export const columns: ColumnDef<Contractor>[] = [
  {
    accessorKey: 'employee.idNumber',

    id: 'ת.ז',
    header: ({ column }) => <Header column={column} />
  },
  {
    accessorKey: 'employee.firstName',
    id: 'שם פרטי',
    header: ({ column }) => <Header column={column} />
  },
  {
    accessorKey: 'employee.lastName',
    id: 'שם משפחה',
    header: ({ column }) => <Header column={column} />
  },
  {
    accessorKey: 'employee.phoneNumber',
    id: 'טלפון',
    header: ({ column }) => <Header column={column} />
  },
  {
    accessorKey: 'employee.department',
    id: 'מחלקה',
    header: ({ column }) => <Header column={column} />
  },
  {
    accessorKey: 'companyName',
    id: 'שם חברה',
    header: ({ column }) => <Header column={column} />
  },
  {
    accessorKey: 'authExpiryDate',
    id: 'תוקף אישור',
    header: ({ column }) => <Header column={column} />,
    cell: ({ row }) => {
      const date = new Date(row.original.authExpiryDate);
      const isExpired = date < new Date();
      return (
        <div className={cn(isExpired ? 'text-red-500' : 'text-green-500')}>
          {date.toLocaleDateString('en-GB')}
        </div>
      );
    }
  },
  {
    accessorKey: 'employee.manager.firstName',
    id: 'גורם מאשר',
    header: ({ column }) => <Header column={column} />
  },
  {
    accessorKey: 'actions',
    id: 'פעולות',
    header: ({ column }) => <Header column={column} />,
    cell: ({ row }) => {
      return <ContractorActions row={row} />;
    }
  }
];
