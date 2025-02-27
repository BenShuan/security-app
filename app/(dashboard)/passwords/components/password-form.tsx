'use client';

// React and Next.js imports

// Form libraries

// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form/form';

// Types and utilities
import {
  DepartmentArray,
  PasswordGroupArray,
  SiteArray
} from '@/lib/schemes';
import { useEmployeeForm } from '@/lib/utils/hooks/useEmployeeForm';
import { usePasswordForm } from '@/lib/utils/hooks/usePasswordForm';
import { Password } from '@prisma/client';

const PasswordsFields = [
  // Employee fields
  { key: 'name', type: 'string', label: 'שם' },
  { key: 'userName', type: 'string', label: 'שם משתמש' },
  { key: 'password', type: 'string', label: 'סיסמא' },
  { key: 'seconde_password', type: 'string', label: 'סיסמא נוספת' },
  { key: 'description', type: 'string', label: 'תיאור' },
  { key: 'group', type: 'enum', label: 'קבוצה', options: PasswordGroupArray.options },
  {
    key: 'site',
    type: 'enum',
    options: SiteArray.options,
    label: 'אתר'
  }
] as const;


function PasswordForm({password=null}:{password?:Password|null}) {
 
  const {form,renderField,isPending,isUpdating,updatePassword }=usePasswordForm({
    password:password
  });

  console.log('password', password)

  
  return (
    <Form {...form}>
      <form

        onSubmit={form.handleSubmit( updatePassword)}
        className=" grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
      >
        {PasswordsFields.map(renderField)}
        <Button
          type="submit"
          className="col-span-1 sm:col-span-2 block"
          disabled={isPending}
        >
          {isPending ? 'טוען...' : 'עדכן פרטים'}
        </Button>
      </form>
    </Form>
  );
}

export default PasswordForm;
