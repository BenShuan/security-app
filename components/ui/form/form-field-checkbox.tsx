import { Link } from 'lucide-react'
import React from 'react'
import { FormItem, FormControl, FormLabel } from './form'
import { Checkbox } from '@/components/components/ui/checkbox';

function FormFieldCheckBox({
  field,
  label
}: {
  field: any;
  label: string;
}) {
  return (
    
    <FormItem className="flex flex-row gap-6 items-end space-x-3 space-y-0 rounded-md border p-4 ">
    <FormControl>
      <Checkbox
        checked={field.value}
        onCheckedChange={field.onChange}
      />
    </FormControl>
    <div className="space-y-1 leading-none">
      <FormLabel>
        {label}
      </FormLabel>
    </div>
  </FormItem>
  )
}

export default FormFieldCheckBox