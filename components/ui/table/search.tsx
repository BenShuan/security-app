'use client';

import { Table } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { Input } from '../input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchInput({
  table,
  className = ''
}: {
  table: Table<any>;
  className?: string;
}) {

  const [queryInput, setQueryInput] = useState('')
  const router = useRouter()

  const search = useSearchParams()

  const query = search.get('query')

  useEffect(() => {
    if (query) {
      table.setGlobalFilter(query);
    }

  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryInput(e.target.value)
    table.setGlobalFilter(e.target.value)
    router.push(`?query=${e.target.value}`)
  }

  return (
    <div className={`relative md:grow-0 rounded-full w-fit py-4  ${className}`}>
      <Search className="absolute left-2.5 top-[1.75rem] h-4 w-4 text-muted-foreground" />

      <Input
        type="search"
        placeholder="חיפוש"
        value={queryInput}
        onChange={handleSearch  }
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  );
}
