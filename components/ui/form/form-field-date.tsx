'use client';

import { format } from 'date-fns';
import { CalendarIcon, ChevronRight, ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calender';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils/tailwind';

export default function FormFieldDate({
  field,
  label
}: {
  field: any;
  label: string;
}) {
  return (
    <FormItem className="flex flex-col justify-between">
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-full pl-3 text-left font-normal bg-white',
                !field.value && 'text-muted-foreground'
              )}
            >
              {field.value ? (
                format(field.value, 'PPP')
              ) : (
                <span>תבחר תאריך</span>
              )}
              <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            showOutsideDays={false}
            classNames={{
              weekdays: 'flex justify-between items-center',
              weekday: 'flex justify-center items-center',
              caption_label: 'text-md font-medium text-center',
              month_caption: 'w-full flex justify-center items-center',
              today:  'bg-foreground/90 text-white',
              selected: 'bg-foreground/10 ',
              nav: 'flex justify-between items-center absolute top-4 left-0 w-full ',
            }}
          />
        </PopoverContent>

      </Popover>
      <FormMessage />
    </FormItem>
  );
}
