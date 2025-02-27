import React from 'react';
import GuardGrid from './components/guard-grid';
import { checkManeger } from '@/lib/actions/auth';
import { redirect } from 'next/navigation';
async function GuardsPage() {
  const isManager = await checkManeger();

  if (!isManager) {
    redirect('/employees');
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 hidden md:block">מאבטחים</h1>
      <GuardGrid />
    </div>
  );
}

export default GuardsPage;
