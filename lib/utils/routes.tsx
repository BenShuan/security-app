import { BusIcon, CarIcon, HardHatIcon, HomeIcon, KeyIcon, LockIcon, UsersIcon } from "lucide-react";

export type Route = {  
  name: string;
  path: string;
  icon: React.ReactNode;
  children?: Route[];
};


export const routes: Route[] = [
  {
    name: 'דף הבית',
    path: '/',
    icon: <HomeIcon />,
  },
  {
    name: 'הסעות',
    path: '/rides',
    icon: <BusIcon />,
  },
  {
    name: 'רכבים',
    path: '/vehicles', 
    icon: <CarIcon />,
  },
  {
    name: 'קבלנים',
    path: '/contractors',
    icon: <HardHatIcon />,
  },
  {
    name: 'מפתחות',
    path: '/keys',
    icon: <KeyIcon />,
  },
  {
    name: 'סיסמאות',
    path: '/passwords',
    icon: <LockIcon />,
  },
  {
    name: 'עובדים',
    path: '/employees',
    icon: <UsersIcon />,
  }
];

