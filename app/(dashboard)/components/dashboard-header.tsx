'use client'
import { routes } from '@/lib/utils/routes'
import { usePathname } from 'next/navigation'
import React from 'react'

const DashboardHeader = () => {

  const path = usePathname()

  let title = "";

  routes.forEach(rout=>{
    if (path.startsWith(rout.path)) {
      title = rout.name
    }
  })

  return (
    <h1 className="text-3xl font-bold mb-4 hidden md:flex">{title}</h1>

  )
}

export default DashboardHeader