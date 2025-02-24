'use client';

// React and Next.js imports

// Form libraries

// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form/form';

// Types and utilities
import { DepartmentArray, SiteArray } from '@/lib/schemes';
import { useEmployeeForm } from '@/lib/utils/hooks/useEmployeeForm';
import useKeyForm from '@/lib/utils/hooks/useKeyForm';

const KeyFields = [
  // Employee fields
  { key: 'keyNumber', type: 'string', label: 'מספר מפתח' },
  { key: 'description', type: 'string', label: 'תיאור' },
  {key:'site', type:'enum', options: SiteArray.options, label:'אתר' }
  
] as const;

function KeyForm() {
  const { keyForm, renderField, isPending,updateKey,isUpdating } =useKeyForm();

  return (
    <Form {...keyForm}>
      <form
        onSubmit={keyForm.handleSubmit(updateKey)}
        className=" grid grid-cols-1 gap-4 w-full"
      >
        {KeyFields.map(renderField)}
        <Button
          type="submit"
          className="col-span-1 "
          disabled={isPending}
        >
          {isPending ? 'טוען...' : isUpdating?"עדכן מפתח":"הוסף מפתח"}
        </Button>
      </form>
    </Form>
  );
}

export default KeyForm;
