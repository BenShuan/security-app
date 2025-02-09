'use client';

import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/table/header';
import { updateContractorAction } from '@/lib/actions/contractors';
import { ColumnDef } from '@tanstack/react-table';
import {
  ClockIcon,
  PencilIcon
} from 'lucide-react';
import type { Contractor } from 'node_modules/.prisma/client/index.js';

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
      return date.toLocaleDateString('en-GB');
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
        <div className="flex justify-between m-0 p-0">
          <Button
            variant="ghost"
            className="rounded-full p-1"
            formAction={updateContractorAction}
          >
            <ClockIcon className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            className="rounded-full p-1"
            formAction={updateContractorAction}
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
        </div>
      );
    }
  }
];
