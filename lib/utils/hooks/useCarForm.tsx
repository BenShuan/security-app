'use client';

import FormFieldInput from '@/components/ui/form/form-field-input';
import { FormField } from '@/components/ui/form/form';
import FormFieldDate from '@/components/ui/form/form-field-date';
import FormFieldSelect from '@/components/ui/form/form-field-select';
import { Prisma } from '@prisma/client';
import { carFormSchemeType, carFormScheme } from '@/lib/schemes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import FormFieldCheckBox from '@/components/ui/form/form-field-checkbox';
import { getCarByCarNumberOrEmployeeId } from '@/lib/db/DBCars';
import { searchcarByLicenseNumberOrEmployeeIdAction } from '@/lib/actions/carsActions';

export function useCarForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<carFormSchemeType>({
    resolver: zodResolver(carFormScheme),
    defaultValues: {
      employee: {
        firstName: '',
        lastName: '',
        employeeId: '',
        phoneNumber: ''
      },
      authParking: false,
      employeeId: '',
      licenseNumber: '',
      model: '',
      manufacturer: ''
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
              if (
                attr.key === 'employee.employeeId' ||
                attr.key === 'licenseNumber'
              )
                await searchCar(e.currentTarget.value); // Call your custom handler
            },
            maxLength:
              attr.key === 'employeeId' || attr.key === 'phoneNumber' ? 10 : 30,
            disabled:
              attr.key !== 'licenseNumber' && attr.key !== 'employee.employeeId'
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
            case 'checkbox':
              return (
                <FormFieldCheckBox field={updatedField} label={attr.label} />
              );
            default:
              return <FormFieldInput field={updatedField} label={attr.label} />;
          }
        }}
      />
    );
  };

  // 2. Define a submit handler.

  const searchCar = async (searchQuery: string) => {
    try {
      startTransition(async () => {
        const result =
          await searchcarByLicenseNumberOrEmployeeIdAction(searchQuery);

        if (result.success) {
          form.setValue(
            'employee.firstName',
            result.data?.employee?.firstName || '',
            {
              shouldValidate: false
            }
          );
          form.setValue(
            'employee.lastName',
            result.data?.employee?.lastName || '',
            {
              shouldValidate: false
            }
          );
          form.setValue(
            'employee.phoneNumber',
            result.data?.employee?.phoneNumber || '',
            {
              shouldValidate: false
            }
          );
          form.setValue(
            'model',
            result.data?.model || '',
            {
              shouldValidate: false
            }
          );
          form.setValue(
            'manufacturer',
            result.data?.manufacturer || '',
            {
              shouldValidate: false
            }
          );
          form.setValue(
            'authParking',
            result.data?.authParking || false,
            {
              shouldValidate: false
            }
          );   form.setValue(
            'licenseNumber',
            result.data?.licenseNumber || "",
            {
              shouldValidate: false
            }
          ); 
            form.setValue(
            'employee.employeeId',
            result.data?.employeeId || "",
            {
              shouldValidate: false
            }
          );

        }
      });
    } catch (error) {
      console.error('Failed to search contractor:', error);
    }
  };

  return {
    form,
    searchCar,
    renderField,
    isPending
  };
}
