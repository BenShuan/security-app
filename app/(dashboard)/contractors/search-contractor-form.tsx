'use client';

// Components
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form/form';
import FormFieldInput from '@/components/ui/form/form-field-input';
import FormFieldSelect from '@/components/ui/form/form-field-select';
import FormFieldDate from '@/components/ui/form/form-field-date';

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
  { key: 'companyName', type: 'string', label: 'שם חברה' },
  { key: 'employee.phoneNumber', type: 'string', label: 'מספר טלפון' },
  { key: 'authExpiryDate', type: 'date', label: 'תוקף אישור' },
  { key: 'employee.manager', type: 'string', label: 'מנהל' },
  {
    key: 'employee.department',
    type: 'enum',
    options: DepartmentArray,
    label: 'מחלקה'
  },


  {
    key: 'employee.site',
    type: 'enum',
    options: SiteArray,
    label: 'אתר'
  }
] as const;


function SearchContractorForm() {
  const {form,updateAuthExpiryDate,renderField, isPending} = useContractorForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit( updateAuthExpiryDate)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden"
      >
        {contractorWithEmployeeFields.map(renderField)}

        <Button
          type="submit"
          className="col-span-1 sm:col-span-2"
          disabled={isPending}
        >
          {isPending ? 'מעדכן...' : 'עדכן אישור'}
        </Button>
      </form>
    </Form>
  );
}

export default SearchContractorForm;