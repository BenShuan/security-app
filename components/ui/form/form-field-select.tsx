import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import React, { useEffect, useState } from 'react';
import { FormItem, FormLabel, FormControl, FormMessage } from './form';

function FormFieldSelect({
  field,
  options,
  label
}: {
  field: any;
  options: string[] | readonly string[] ;
  label: string;
}) {
 

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Select
        onValueChange={field.onChange}
        defaultValue={field.value}
        value={field.value}
        {...field}
      >
        <FormControl>
          <SelectTrigger className="bg-white text-right ">
            <SelectValue placeholder={label} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((option) => (
            <SelectItem className="text-right" key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
}

export default FormFieldSelect;
