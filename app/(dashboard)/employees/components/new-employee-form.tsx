'use client';

// React and Next.js imports

// Form libraries

// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form/form';

// Types and utilities
import {
  DepartmentArray,
  SiteArray
} from '@/lib/schemes';
import { useEmployeeForm } from '@/lib/utils/hooks/useEmployeeForm';

const contractorWithEmployeeFields = [
  // Employee fields
  { key: 'employeeId', type: 'string', label: 'מספר עובד' },
  { key: 'idNumber', type: 'string', label: 'תעודת זהות' },
  { key: 'firstName', type: 'string', label: 'שם פרטי' },
  { key: 'lastName', type: 'string', label: 'שם משפחה' },
  { key: 'phoneNumber', type: 'string', label: 'מספר טלפון' },
  { key: 'email', type: 'string', label: 'דואר אלקטרוני' },
  { key: 'startDate', type: 'date', label: 'תאריך תחילת עבודה' },
  {
    key: 'department',
    type: 'enum',
    options: DepartmentArray.options,
    label: 'מחלקה'
  },
  {
    key: 'site',
    type: 'enum',
    options: SiteArray.options,
    label: 'אתר'
  }
] as const;
  

function NewEmployeeForm() {
 
  const {form,renderField,isPending,isUpdating,updateEmployee }=useEmployeeForm();


  
  return (
    <Form {...form}>
      <form

        onSubmit={form.handleSubmit( updateEmployee)}
        className=" grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
      >
        {contractorWithEmployeeFields.map(renderField)}
        <Button
          type="submit"
          className="col-span-1 sm:col-span-2 hidden md:block"
          disabled={isPending}
        >
          {isPending ? 'טוען...' : 'עדכן פרטים'}
        </Button>
      </form>
    </Form>
  );
}

export default NewEmployeeForm;
