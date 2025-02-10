'use client';

import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/table/header';
import { addMonthToContractorAction, updateContractorAction } from '@/lib/actions/contractors';
import { ColumnDef } from '@tanstack/react-table';
import {
  ClockIcon,
  PencilIcon
} from 'lucide-react';
import type { Contractor } from 'node_modules/.prisma/client/index.js';
import ContractorActions from './contractor-actions';
import { cn } from '@/lib/utils/tailwind';
export const columns: ColumnDef<Contractor>[] = [
  {
    accessorKey: 'employee.idNumber',

    id: 'ת.ז',
    header: ({ column }) => <Header column={column} title="ת.ז" />
  },
  {
    accessorKey: 'employee.firstName',
    id: 'שם פרטי',
    header: ({ column }) => <Header column={column} title="שם פרטי" />
  },
  {
    accessorKey: 'employee.lastName',
    id: 'שם משפחה',
    header: ({ column }) => <Header column={column} title="שם משפחה" />
  },
  {
    accessorKey: 'employee.phoneNumber',
    id: 'טלפון',
    header: ({ column }) => <Header column={column} title="טלפון" />
  },
  {
    accessorKey: 'employee.department',
    id: 'מחלקה',
    header: ({ column }) => <Header column={column} title="מחלקה" />
  },
  {
    accessorKey: 'companyName',
    id: 'שם חברה',
    header: ({ column }) => <Header column={column} title="שם חברה" />
  },
  {
    accessorKey: 'authExpiryDate',
    id: 'תוקף אישור',
    header: ({ column }) => <Header column={column} title="תוקף אישור" />,
    cell: ({ row }) => {
      const date = new Date(row.original.authExpiryDate);
      const isExpired = date < new Date();
      return (
        <div className={cn(isExpired ? 'text-red-500' : 'text-green-500')}>
          {/* {date.toLocaleDateString('en-GB')} */}
        </div>
      );

    }
  },
  {
    accessorKey: 'employee.manager.firstName',
    id: 'גורם מאשר',
    header: ({ column }) => <Header column={column} title="גורם מאשר" />
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
      return (
        <ContractorActions row={row} />
      );
    }
  }
];
