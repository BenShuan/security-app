'use client'

// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form/form';

// Types and utilities
import {
  DepartmentArray,
  SiteArray
} from '@/lib/schemes';
import { useContractorForm } from '@/lib/utils/hooks/useContractorForm';

const contractorWithEmployeeFields = [
  // Employee fields
  { key: 'employee.idNumber', type: 'string', label: 'תעודת זהות' },
  { key: 'employee.firstName', type: 'string', label: 'שם פרטי' },
  { key: 'employee.lastName', type: 'string', label: 'שם משפחה' },
  { key: 'employee.employeeId', type: 'string', label: 'מספר עובד' },
  { key: 'companyName', type: 'string', label: 'שם חברה' },
  { key: 'employee.phoneNumber', type: 'string', label: 'מספר טלפון' },
  { key: 'employee.email', type: 'string', label: 'דואר אלקטרוני' },
  { key: 'employee.startDate', type: 'date', label: 'תאריך תחילת עבודה' },
  {
    key: 'employee.department',
    type: 'enum',
    options: DepartmentArray.options,
    label: 'מחלקה'
  },
  {
    key: 'employee.site',
    type: 'enum',
    options: SiteArray.options,
    label: 'אתר'
  }
] as const;



function NewContractorForm() {
 
  const {form,createContractor,renderField,isPending,isUpdating,updateContractor }=useContractorForm();


  
  return (
    <Form {...form}>
      <form

        onSubmit={form.handleSubmit(isUpdating ? updateContractor : createContractor)}
        className=" grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
      >
        {contractorWithEmployeeFields.map(renderField)}
        <Button
          type="submit"
          className="col-span-1 sm:col-span-2"
          disabled={isPending}
        >
          {isPending ? 'טוען...' : 
          isUpdating ? 'עדכן פרטים' :
          'הוסף קבלן'}
        </Button>
      </form>
    </Form>
  );
}

export default NewContractorForm;
