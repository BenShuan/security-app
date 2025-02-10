'use client';

import FormFieldInput from '@/components/ui/form/form-field-input';
import { FormField } from '@/components/ui/form/form';
import FormFieldDate from '@/components/ui/form/form-field-date';
import FormFieldSelect from '@/components/ui/form/form-field-select';
import {
  addMonthToContractorAction,
  createContractorAction,
  searchContractorAction,
  updateContractorAction
} from '@/lib/actions/contractors';
import { contractorFormSchemaType } from '@/lib/schemes';
import { contractorFormSchema } from '@/lib/schemes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function useContractorForm() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isUpdating, setIsUpdating] = useState(false);

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
        site: undefined,
        manager: ''
      },
      companyName: '',
      authExpiryDate: new Date()
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
              if (attr.key === 'employee.idNumber')
                await searchContractor(e.currentTarget.value); // Call your custom handler
            }
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

  const searchContractor = async (searchQuery: string) => {
    try {
      startTransition(async () => {
        const result = await searchContractorAction(searchQuery);

        if (!result) throw new Error('קבלן לא נמצא');

        const employeeData = {
          ...result.employee,
          manager: result.employee.manager
            ? `${result.employee.manager.firstName} ${result.employee.manager.lastName}`
            : ''
        };
        if (result.authExpiryDate < new Date()) {
          toast.error('אישור לא בתוקף!', {
            description:
              'לקבלן זה אין אישור בתוקף, יש לדבר עם המנהל כדי לקבל אישור חדש',
            position: 'top-center',
            duration: 5000,
            icon: '🚨'
          });
        }

        setIsUpdating(true);

        form.setValue('companyName', result.companyName || '', {
          shouldValidate: false
        });
        form.setValue('authExpiryDate', result.authExpiryDate || new Date(), {
          shouldValidate: false
        });
        form.setValue('employee', employeeData, { shouldValidate: false });
      });
    } catch (error) {
      console.error('Failed to search contractor:', error);
    }
  };

  // 2. Define a submit handler.

  function createContractor(values: contractorFormSchemaType) {
    startTransition(async () => {
      try {
        const result = await createContractorAction(values);

        if (result.success) {
          toast.success('קבלן נוסף בהצלחה', {
            style: {
              color: 'green'
            }
          });
          router.push('/contractors');
        } else {
          toast.error('שגיאה', {
            description:
              result.error instanceof Error ? result.error.message : 'קרתה תקלה'
          });
        }
      } catch (error) {
        toast.error('שגיאה', {
          description: error instanceof Error ? error.message : 'קרתה תקלה'
        });
      }
    });
  }

  function updateContractor(values: contractorFormSchemaType) {
    startTransition(async () => {
      try {
        const result = await updateContractorAction(values);
        if (result.success) {
          toast.success('קבלן עודכן בהצלחה');
          router.push('/contractors');
        } else {
          toast.error('שגיאה', {
            description:
              result.error instanceof Error ? result.error.message : 'קרתה תקלה'
          });
        }
      } catch (error) {
        toast.error('שגיאה', {
          description: error instanceof Error ? error.message : 'קרתה תקלה'
        });
      }
    });
  }

  async function updateAuthExpiryDate(contractor: contractorFormSchemaType) {
    console.log(contractor);
    try {
      startTransition(async () => {
        const result = await addMonthToContractorAction(
          contractor.employee.idNumber
        );

        if (result.success) {
          toast.success('אישור עודכן בהצלחה');
        } else {
          toast.error('שגיאה', {
            description: result.error
          });
        }
      });
    } catch (error) {
      toast.error('שגיאה', {
        description: error instanceof Error ? error.message : 'קרתה תקלה'
      });
    }
  }

  return {
    form,
    searchContractor,
    createContractor,
    updateContractor,
    updateAuthExpiryDate,
    renderField,
    isUpdating,
    isPending
  };
}
