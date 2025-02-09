'use client';

// React and Next.js imports
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

// Form libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Components
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form/form';
import FormFieldInput from '@/components/ui/form/form-field-input';
import FormFieldSelect from '@/components/ui/form/form-field-select';

// Types and utilities
import {
  contractorFormSchema,
  contractorFormSchemaType,
  DepartmentArray,
  SiteArray
} from '@/lib/schemes';
import { createContractorAction } from '@/lib/actions/contractors';
import { toast } from 'sonner';

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

function NewContractor() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<contractorFormSchemaType>({
    resolver: zodResolver(contractorFormSchema),
    defaultValues: {
      employee: {
        idNumber: '',
        firstName: '',
        lastName: '',
        employeeId: '',
        phoneNumber: '',
        email: '',
        startDate: new Date(),
        department: undefined,
        site: undefined
      },
      companyName: '',
      authExpiryDate: new Date()
    }
  });

  // 2. Define a submit handler.
  function onSubmit(values: contractorFormSchemaType) {
    startTransition(async () => {
      try {
        const result = await createContractorAction(values);

        if (result.success) {
          toast.success('קבלן נוסף בהצלחה');
          router.push('/contractors');
        } else {
          toast.error('שגיאה', {
            description: result.error
          });
        }
      } catch (error) {
        toast.error('שגיאה', {
          description: error instanceof Error ? error.message : 'קרתה תקלה'
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" grid grid-cols-2 gap-4"
      >
        {contractorWithEmployeeFields.map((attr) => {
          if (attr.type !== 'enum') {
            return (
              <FormField
                key={attr.key}
                control={form.control}
                name={attr.key}
                render={({ field }) => (
                  <FormFieldInput field={field} label={attr.label} />
                )}
              />
            );
          } else {
            return (
              <FormField
                key={attr.key}
                control={form.control}
                name={attr.key}
                render={({ field }) => (
                  <FormFieldSelect
                    field={field}
                    options={attr.options}
                    label={attr.label}
                  />
                )}
              />
            );
          }
        })}
        <Button type="submit" className="col-span-2" disabled={isPending}>
          {isPending ? 'טוען...' : 'הוסף קבלן'}
        </Button>
      </form>
    </Form>
  );
}

export default NewContractor;
