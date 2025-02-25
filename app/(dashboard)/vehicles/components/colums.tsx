'use client'
import { Header } from '@/components/ui/table/header';
import { ColumnDef } from '@tanstack/react-table';
import { Car, Employee, Prisma } from '@prisma/client';
import CarActionsIcons from './car-actions-icons';
import { Checkbox } from '@/components/ui/checkbox';

export const columns: ColumnDef<Car>[] = [
  {
    accessorKey: 'licenseNumber',

    id: 'מספר רכב',
    header: ({ column }) => <Header column={column} title="מספר רכב" />
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
    accessorKey: 'manufacturer',
    id: 'יצרן',
    header: ({ column }) => <Header column={column} title="יצרן" />
  },
  {
    accessorKey: 'model',
    id: 'דגם',
    header: ({ column }) => <Header column={column} title="דגם" />
  },
  {
    accessorKey: 'authParking',
    id: 'אישור חניון',
    header: ({ column }) => <Header column={column} title="אישור חניון" />,
    cell: ({ row }) => <Checkbox checked={row.original.authParking} />
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
      return <CarActionsIcons row={row} />;
    }
  }
];
