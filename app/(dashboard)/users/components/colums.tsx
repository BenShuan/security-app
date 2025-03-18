'use client'
import { Header } from '@/components/ui/table/header';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '@prisma/client'
import UsersActionIcons from './user-actions-icons';
import ResetPasswordButton from './reset-password-button';

export const columns: ColumnDef<User>[] = [

  {
    accessorKey: 'userName',
    id: 'שם משתמש',
    header: ({ column }) => <Header column={column}  />
  }, {
    accessorKey: 'email',
    id: 'אימייל',
    header: ({ column }) => <Header column={column}  />
  },
  {
    accessorKey: 'site',
    id: 'אתר',
    header: ({ column }) => <Header column={column} />
  },
  {
    accessorKey: 'role',
    id: 'תפקיד',
    header: ({ column }) => <Header column={column} />
  },{
    accessorKey: 'createdAt',
    id: 'תאריך יצירה',
    header: ({ column }) => <Header column={column}  />,
    cell:({row})=>row.original.createdAt?.toLocaleString("en-gb")
    
  },
  
  {
    accessorKey: 'password',
    id: 'סיסמה',
    header: ({ column }) => <Header column={column} />,
    cell: ({ row }) =><ResetPasswordButton userName={row.original.userName }/>
  },
  
  {
    accessorKey: 'actions',
    header: ({ column }) =>  <Header column={column}  />,
    id: 'פעולות',
    cell: ({ row }) => {
      return <UsersActionIcons row={row} />;
    }
  }
];
