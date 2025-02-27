'use client';

// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form/form';

// Types and utilities
import { useCarForm } from '@/lib/utils/hooks/useCarForm';

const contractorWithEmployeeFields = [
  // Employee fields
  { key: 'employee.employeeId', type: 'string', label: 'מספר עובד' },
  {key:'licenseNumber', type:'string', label:'מספר רישוי'},
  { key: 'employee.firstName', type: 'string', label: 'שם פרטי' },
  { key: 'employee.lastName', type: 'string', label: 'שם משפחה' },
  { key: 'employee.phoneNumber', type: 'string', label: 'מספר טלפון' },
  {key:'manufacturer', type:'string', label:'יצרן'},
  {key:'model', type:'string', label:'דגם'},
  {key:'authParking', type:'checkbox', label:'אישור חניון'},
] as const;


function SearchCarForm() {
  const {form,renderField ,isPending} = useCarForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit( ()=>null)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4  py-4"
      >
        <p className='text-sm text-gray-500 col-span-1  sm:col-span-2'>על מנת לחפש פרטים יש להזין מספר עובד או מספר רכב</p>
        {contractorWithEmployeeFields.map(renderField)}

        <Button
          type="button"
          onClick={()=>form.reset()}
          className="col-span-1 sm:col-span-2"
          disabled={isPending}
        >
          {isPending ? 'מחפש...' : 'נקה טופס'}
        </Button>
      </form>
    </Form>
  );
}

export default SearchCarForm;