'use client';

import FormFieldInput from '@/components/ui/form/form-field-input';
import { FormField } from '@/components/ui/form/form';
import FormFieldDate from '@/components/ui/form/form-field-date';
import FormFieldSelect from '@/components/ui/form/form-field-select';
  import {
  DepartmentArrayType,
  employeeFormSchema,
  employeeFormSchemaType,
  SiteArrayType
} from '@/lib/schemes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { searchEmployeeAction, updateEmployeeAction } from '@/lib/actions/employeesActions';

export function useEmployeeForm() {
  const router = useRouter();
  
  const searchParams = useSearchParams();
  
  const employeeId = searchParams.get('employeeId');
  const isEdit = Boolean(searchParams.get('isEdit'));
  
  const [isUpdating, setIsUpdating] = useState(isEdit );
  const [isPending, startTransition] = useTransition();

  console.log(employeeId);

  const form = useForm<employeeFormSchemaType>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
        idNumber: "",
        firstName: '',
        lastName: '',
        employeeId: employeeId || '',
        phoneNumber: '',
        email: '',
        startDate: new Date(),
        department: '' as DepartmentArrayType,
        site: '' as SiteArrayType,
        managerId: null
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
            onBlur: async (e: React.FocusEvent<HTMLInputElement>) => {
              field.onBlur(); // Call the original onBlur
              if (attr.key === 'employeeId'){
                await searchEmployee(e.currentTarget.value); // Call your custom handler
                console.log(form.getValues());  
              }
                
            },
            maxLength:
              attr.key === 'idNumber' ||
              attr.key === 'employeeId' ||
              attr.key === 'phoneNumber'
                ? 10
                : 30,
            disabled: !isEdit && attr.key !== 'employeeId'
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

  const searchEmployee = async (searchQuery: string) => {
    try {
      startTransition(async () => {
        const result = await searchEmployeeAction(searchQuery);

        if (result.success && result.data) {
          const employeeData = {
            ...result.data,
            manager: result.data?.manager
              ? `${result.data.manager.firstName} ${result.data.manager.lastName}`
              : ''
          };


          Object.keys(employeeData).forEach((key) => {
            form.setValue(key as keyof employeeFormSchemaType, employeeData[key as keyof employeeFormSchemaType], {
              shouldValidate: false
            });
          });
      }
      });
    } catch (error) {
      console.error('Failed to search contractor:', error);
    }
  };

  // 2. Define a submit handler.

  function updateEmployee(values: employeeFormSchemaType) {
    startTransition(async () => {
      try {
        const result = await updateEmployeeAction(values);
        if (result.success) {
          toast.success('עובד עודכן בהצלחה');
          router.push('/employees');
        } else {
          toast.error('שגיאה', {
            description:
              result.message
          });
        }
      } catch (error) {
        toast.error('שגיאה', {
          description: error instanceof Error ? error.message : 'קרתה תקלה'
        });
      }
    });
  }


  return {
    form,
     searchEmployee,
     updateEmployee,
    renderField,
    isUpdating,
    isPending
  };
}
