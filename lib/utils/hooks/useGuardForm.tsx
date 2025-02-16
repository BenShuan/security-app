'use client';

import FormFieldInput from '@/components/ui/form/form-field-input';
import { FormField } from '@/components/ui/form/form';
import FormFieldDate from '@/components/ui/form/form-field-date';
import FormFieldSelect from '@/components/ui/form/form-field-select';
import { Prisma } from '@prisma/client';
import {
  employeeFormSchemaType,
  guardFormSchemaType,
  guardFormSchema,
  SiteArrayType,
  DepartmentArrayType
} from '@/lib/schemes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { updateGuardAction } from '@/lib/actions/employeesActions';

export function useGuardForm(
  guard: Prisma.EmployeeGetPayload<{
    include: {
      guard: true;
    };
  }>
) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<guardFormSchemaType>({
    resolver: zodResolver(guardFormSchema),
    defaultValues: {
      ...guard,
      guard: {
        ...guard.guard,
        lastCourse: guard.guard?.lastCourse
          ? new Date(guard.guard.lastCourse)
          : null,
        nextCourse: guard.guard?.nextCourse
          ? new Date(guard.guard.nextCourse)
          : null
      },
      department: guard.department as DepartmentArrayType,
      site: guard.site as SiteArrayType
    }
  });

  const renderField = (attr: any) => {
    return (
      <FormField
        key={attr.key}
        control={form.control}
        name={attr.key}
        render={({ field }) => {
          const updatedField = {
            ...field,
            maxLength:
              attr.key === 'idNumber' ||
              attr.key === 'employeeId' ||
              attr.key === 'phoneNumber'
                ? 10
                : 30,
            disabled: !isUpdating
          };

          switch (attr.type) {
            case 'enum':
              return (
                <FormFieldSelect
                  field={updatedField}
                  options={attr.options}
                  label={attr.label}
                />
              );
            case 'date':
              return <FormFieldDate field={updatedField} label={attr.label} />;
            default:
              return <FormFieldInput field={updatedField} label={attr.label} />;
          }
        }}
      />
    );
  };

  // 2. Define a submit handler.

  function updateGuard(values: guardFormSchemaType) {
    console.log(values);
    startTransition(async () => {
      const result = await updateGuardAction(values);
      if (result.success) {
        toast.success('מאבטח עודכן בהצלחה');
      } else {
        toast.error('שגיאה', {
          description: result.message
        });
      }
    });
    setIsUpdating(false);
  }

  return {
    form,
    updateGuard,
    renderField,
    isUpdating,
    setIsUpdating,
    isPending
  };
}
