import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Route } from '@/lib/utils/routes';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react'


interface DashboardCardProps{
header:string|React.ReactNode,
route: Route,
body:React.ReactNode

}

const DashboardCard = ({header,route,body}:DashboardCardProps) => {
  return (
    <Card className='h-1/2 flex flex-col w-1/3 pb-4' >
      <CardHeader className="font-bold text-center flex flex-row justify-between items-center">
        {header}
        <Link className="font-normal inline-block" href={route.path}>
          <Button variant={'ghost'} className="text-sm">
            לכל ה{route.name} <ArrowLeft />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className='flex-gorw overflow-scroll'>
      {body}
      </CardContent>
    </Card>
  )
}

export default DashboardCard