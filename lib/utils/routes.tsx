import { Role } from "@prisma/client";
import { BusIcon, CarIcon, HardHatIcon, HomeIcon, KeyIcon, LockIcon, UserCog, UsersIcon } from "lucide-react";
import { RoleArray, RoleArrayType } from "../schemes";

export type Route = {  
  name: string;
  path: string;
  icon: React.ReactNode;
  permition:RoleArrayType[]
  children?: Route[];
};


export const routes: Route[] = [
  {
    name: 'דף הבית',
    path: '/',
    icon: <HomeIcon />,
    permition:RoleArray.options
  },
  {
    name: 'הסעות',
    path: '/rides',
    icon: <BusIcon />,
    permition:RoleArray.options

  },
  {
    name: 'רכבים',
    path: '/vehicles', 
    icon: <CarIcon />,
    permition:RoleArray.options

  },
  {
    name: 'קבלנים',
    path: '/contractors',
    icon: <HardHatIcon />,
    permition:RoleArray.options

  },
  {
    name: 'מפתחות',
    path: '/keys',
    icon: <KeyIcon />,
    permition:RoleArray.options

  },
  {
    name: 'סיסמאות',
    path: '/passwords',
    icon: <LockIcon />,
    permition:RoleArray.options

  },
  {
    name: 'עובדים',
    path: '/employees',
    icon: <UsersIcon />,
    permition:RoleArray.options

  },
{
    name: 'משתמשים',
    path: '/users',
    icon: <UserCog />,
    permition:[Role.admin,Role.manager]
  }
];

