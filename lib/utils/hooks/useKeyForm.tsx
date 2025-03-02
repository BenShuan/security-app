import { FormField } from '@/components/ui/form/form';
import FormFieldDate from '@/components/ui/form/form-field-date';
import FormFieldInput from '@/components/ui/form/form-field-input';
import FormFieldSelect from '@/components/ui/form/form-field-select';
import { getKeyByKeyNumberAction, updateKeyAction } from '@/lib/actions/keysActions';
import {
  keyFormScheme,
  keyFormSchemeType,
  SiteArrayType
} from '@/lib/schemes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useAuth from './useAuth';

function useKeyForm() {
  const router = useRouter();

  const searchParams = useSearchParams();

  // const employeeId = searchParams.get('employeeId');
  const isEdit = Boolean(searchParams.get('isEdit'));

  const [isUpdating, setIsUpdating] = useState(isEdit);
  const [isPending, startTransition] = useTransition();

  const {user}=useAuth()

  const keyForm = useForm<keyFormSchemeType>({
    resolver: zodResolver(keyFormScheme),
    defaultValues: {
      keyNumber: '',
      description: '',
      site: user?.site as SiteArrayType 
    }
  });


  const renderField = (attr: any) => {
    return (
      <FormField
        key={attr.key}
        control={keyForm.control}
        name={attr.key}
        render={({ field }) => {
          const updatedField = {
            ...field,
            onBlur: async (e: React.FocusEvent<HTMLInputElement>) => {
              field.onBlur(); // Call the original onBlur
              if (attr.key === 'keyNumber') {
                await searchKey(e.currentTarget.value); // Call your custom handler
                console.log(keyForm.getValues());
              }
            },
            maxLength: 30
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
        const result = await getKeyByKeyNumberAction(searchQuery);

        console.log('result', result);
        if (result) {
          toast.error('קיים מפתח מספר ' + searchQuery);
          setIsUpdating(true);

          keyForm.setValue('description', result.description, {
            shouldValidate: false
          });
          keyForm.setValue('site', result.site as SiteArrayType, {
            shouldValidate: false
          });
        }else{
          setIsUpdating(false);
        }
      });
      
    } catch (error) {
      console.error('Failed to search Key:', error);
    }
  };

  // 2. Define a submit handler.

  function updateKey(values: keyFormSchemeType) {
    startTransition(async () => {
      try {
        values.site=user?.site as SiteArrayType
        const result = await updateKeyAction(values);
        if (result.success) {
          toast.success(result.message);
          router.push('/keys');
        } else {
          toast.error('שגיאה', {
            description: result.message
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
    keyForm,
    searchKey,
    updateKey,
    renderField,
    isUpdating,
    isPending
  };
}

export default useKeyForm;
