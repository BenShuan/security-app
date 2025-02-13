import React from 'react'
import GuardGrid from './components/guard-grid'
function GuardsPage() {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-4 hidden md:block'>מאבטחים</h1>
      <GuardGrid />
    </div>
  )
}

export default GuardsPage;
