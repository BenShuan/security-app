'use client';


// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form/form';

// Types and utilities
import {
  DepartmentArray,
  SiteArray
} from '@/lib/schemes';
import { useGuardForm } from '@/lib/utils/hooks/useGuardForm';
import { cn } from '@/lib/utils/tailwind';
import { Guard, Prisma } from '@prisma/client';

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
    key:'guard.lastCourse',
    type:'date',
    label:'תאריך סיום קורס'
  },
  {
    key:'guard.nextCourse',
    type:'date',
    label:'תאריך אחרון לקורס הבא'
  },{
    key:'address',
    type:'string',
    label:'כתובת'
  }
] as const;


function GuardForm({guard}:{guard:Prisma.EmployeeGetPayload<{
  include: {
    guard: true
  }
}>}) {
 
  const {form,renderField,isPending,isUpdating,updateGuard,setIsUpdating }=useGuardForm(guard);


  console.log(form.formState.errors);
  return (
    <Form {...form}>
      <form

        onSubmit={form.handleSubmit(updateGuard)}
        className=" grid grid-cols-1 sm:grid-cols-3 gap-8 w-full text-right   "
      >
        {contractorWithEmployeeFields.map(renderField)}
        
        
        <div className=' col-span-3 flex justify-center'>
          <Button
            type='button'
            className={cn(
              isUpdating &&'hidden',
             )}
            onClick={()=>{setIsUpdating(true)}}
          >
           ערוך
          </Button>
          <Button
            type='submit'
            className={cn(
              !isUpdating &&'hidden')}
              disabled={isPending}
          >
            {isPending ? 'טוען...' : 'עדכן פרטים'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default GuardForm;
