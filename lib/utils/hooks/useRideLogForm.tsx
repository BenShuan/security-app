import { FormField } from '@/components/ui/form/form';
import FormFieldDate from '@/components/ui/form/form-field-date';
import FormFieldInput from '@/components/ui/form/form-field-input';
import FormFieldSelect from '@/components/ui/form/form-field-select';
import { searchEmployeeAction } from '@/lib/actions/employeesActions';
import { addRideLogActions, companiesNamesActions } from '@/lib/actions/ridesActions';
import { getCompanysName } from '@/lib/db/DBRides';
import {
  DepartmentArray,
  DepartmentArrayType,
  employeeFormSchemaType,
  rideLogFormScheme,
  rideLogFormSchemeType
} from '@/lib/schemes';
import { zodResolver } from '@hookform/resolvers/zod';
import { unstable_cache } from 'next/cache';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function useRideLogForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    async function fetchNames() {
      const names = await companiesNamesActions();
      console.log('names', names);
      setList(names);
    }
    fetchNames();
  }, []);

  const RideLogFields = [
    // Employee fields
    { key: 'employeeId', type: 'string', label: 'מספר עובד' },
    {
      key: 'employee.firstName',
      type: 'string',
      label: 'שם פרטי',
      disabled: true
    },
    {
      key: 'employee.lastName',
      type: 'string',
      label: 'שם משפחה',
      disabled: true
    },
    {
      key: 'employee.department',
      type: 'enum',
      label: 'מחלקה',
      options: DepartmentArray.options,
      disabled: true
    },
    {
      key: 'rideCompanyName',
      type: 'enum',
      label: 'חברת הסעות',
      options: list
    },
    { key: 'manager', type: 'string', label: 'מנהל', disabled: true },
    { key: 'guardId', type: 'string', label: 'מאבטח' },
    { key: 'action', type: 'string', label: 'פעולה' },
    { key: 'reason', type: 'string', label: 'סיבה' }
  ] as const;

  const form = useForm<rideLogFormSchemeType>({
    resolver: zodResolver(rideLogFormScheme),
    defaultValues: {
      employeeId: '',
      guardId: '',
      action: '',
      reason: '',
      employee: {
        firstName: '',
        department: '' as DepartmentArrayType
      },
      rideCompanyName: '',
      manager: ''
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
              if (attr.key === 'employeeId') {
                await searchKey(e.currentTarget.value); // Call your custom handler
                console.log(form.getValues());
              }
            },
            maxLength: 30,
            disabled: attr.disabled
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

  const searchKey = async (searchQuery: string) => {
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
            form.setValue(
              `employee.${key as keyof employeeFormSchemaType}`,
              employeeData[key as keyof employeeFormSchemaType],
              {
                shouldValidate: false
              }
            );
          });

          form.setValue(`manager`, employeeData.manager, {
            shouldValidate: false
          });
        }
      });
    } catch (error) {
      console.error('Failed to search KeyLog:', error);
    }
  };

  function updateRideLog(values: rideLogFormSchemeType) {
    startTransition(async () => {
      try {
        // const result = await updateKeyLogAction(values);
        // if (result.success) {
        //   toast.success('מפתח עודכן בהצלחה');
        //   router.push('/keys');
        // } else {
        //   toast.error('שגיאה', {
        //     description: result.message
        //   });
        // }

        form.reset();
      } catch (error) {
        toast.error('שגיאה', {
          description: error instanceof Error ? error.message : 'קרתה תקלה'
        });
      }
    });
  }
 function createRideLog(values: rideLogFormSchemeType) {
    startTransition(async () => {
      try {
        const result = await addRideLogActions(values);
        if (result.success) {
          toast.success('נסיעה נוספה בהצלחה');
          router.push('/rides');
        } else {
          toast.error('שגיאה', {
            description: result.message
          });
        }

        form.reset();
      } catch (error) {
        toast.error('שגיאה', {
          description: error instanceof Error ? error.message : 'קרתה תקלה'
        });
      }
    });
  }

  return {
    form,
    isPending,
    searchKey,
    updateRideLog,
    createRideLog,
    renderField,
    RideLogFields
  };
}
