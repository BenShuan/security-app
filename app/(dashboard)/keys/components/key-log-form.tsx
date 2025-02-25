'use client';

// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form/form';

// Types and utilities
import { DepartmentArray } from '@/lib/schemes';
import useKeyLogForm from '@/lib/utils/hooks/useKeyLogForm';

const KeyFields = [
  // Employee fields
  { key: 'keyNumber', type: 'string', label: 'מספר מפתח' },
  { key: 'employeeId', type: 'string', label: 'מספר עובד' },
  { key: 'employee.department', type: 'enum', label: 'מחלקה',options:DepartmentArray.options },
  { key: 'employee.firstName', type: 'string', label: 'שם עובד' },
  { key: 'keyOut', type: 'date', label: 'תאריך השאלה' },
  { key: 'guardId', type: 'string', label: 'מאבטח מטפל' },
  
] as const;

function KeyLogForm() {
  const { keyLogForm, renderField, isPending,updateKeyLog,isretrive } =useKeyLogForm();

  return (
    <Form {...keyLogForm}>
      <form
        onSubmit={keyLogForm.handleSubmit(updateKeyLog)}
        className=" grid grid-cols-1 gap-4 w-full"
      >
        {KeyFields.map(renderField)}
        <Button
          type="submit"
          className="col-span-1 "
          disabled={isPending}
        >
          {isPending ? 'טוען...' : isretrive? "החזר מפתח":"הפנק מפתח" }
        </Button>
      </form>
    </Form>
  );
}

export default KeyLogForm;
