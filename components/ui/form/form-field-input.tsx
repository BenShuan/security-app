import React from 'react';
import { FormLabel, FormMessage } from './form';
import { Input } from '../input';
import { FormControl } from './form';
import { FormDescription } from './form';
import { FormItem } from './form';


function FormFieldInput({ field,label}: { field: any,label:string}) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>

      <FormControl>
        <Input placeholder={label} {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>   


  );
}

export default FormFieldInput;
