import { Table } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { Input } from '../input';

export default function SearchInput({
  table,
  className = ''
}: {
  table: Table<any>;
  className?: string;
}) {
  return (
    <div className={`relative md:grow-0 rounded-full w-fit py-4  ${className}`}>
      <Search className="absolute left-2.5 top-[1.75rem] h-4 w-4 text-muted-foreground" />

      <Input
        type="search"
        placeholder="חיפוש"
        value={table.getState().globalFilter}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  );
}
