import { FormField } from '@/components/ui/form/form';
import FormFieldDate from '@/components/ui/form/form-field-date';
import FormFieldInput from '@/components/ui/form/form-field-input';
import FormFieldSelect from '@/components/ui/form/form-field-select';
import { searchEmployeeAction } from '@/lib/actions/employeesActions';
import { getKeyByKeyNumberAction, retriveKeyLogAction, searchKeyLogAction, updateKeyLogAction } from '@/lib/actions/keysActions';
import { DepartmentArrayType, keyLogFormScheme, keyLogFormSchemeType } from '@/lib/schemes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function useKeyLogForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isretrive, setIsretrive] = useState(false)

const keyLogForm = useForm<keyLogFormSchemeType>({
    resolver: zodResolver(keyLogFormScheme),
    defaultValues: {
      keyNumber: '',
      employee:{
        firstName:'',
        department:'' as DepartmentArrayType
      },
      employeeId:"",
      guardId:'',
      keyOut: new Date()
    }
  });


  const renderField = (attr: any) => {
    return (
      <FormField
        key={attr.key}
        control={keyLogForm.control}
        name={attr.key}
        render={({ field }) => {
          const updatedField = {
            ...field,
            onBlur: async (e: React.FocusEvent<HTMLInputElement>) => {
              field.onBlur(); // Call the original onBlur
              if (attr.key === 'keyNumber') {
                await searchKey(e.currentTarget.value); // Call your custom handler
                console.log(keyLogForm.getValues());
              }
              if (attr.key === 'employeeId') {
                await searchEmployee(e.currentTarget.value); // Call your custom handler
                console.log(keyLogForm.getValues());
              }
            },
            maxLength: 30,
            disabled: attr.key.startsWith('employee.'),
            placeholder:attr.placeholder|| attr.label 
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
              return <FormFieldDate  field={updatedField} label={attr.label} />;
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

        console.log('result', result)

        if (result.success ) {
        
            keyLogForm.setValue('employee.department',result.data?.department as DepartmentArrayType)
            keyLogForm.setValue('employee.firstName',result.data?.firstName)

         
        }
      }
    );
    } catch (error) {
      console.error('Failed to search KeyLog:', error);
    }
  };

  const searchKey = async (searchQuery: string) => {
    try {
      startTransition(async () => {
        const key = await getKeyByKeyNumberAction(searchQuery);  
        if (!key) {
          toast.error('לא קיים מפתח מספר ' + searchQuery);
          keyLogForm.setValue('keyNumber', "");
          return;
        }
        const result = await searchKeyLogAction(searchQuery);

        console.log('result', result)

        if (result.success ) {
        
            keyLogForm.setValue('employeeId',result.data?.employee.employeeId ||"")
            // keyLogForm.setValue('employee.department',result.data?.employee.department as DepartmentArrayType)
            keyLogForm.setValue('guardId',result.data?.guardId ||"")
            keyLogForm.setValue('keyOut',result.data?.keyOut|| new Date() )

            setIsretrive(true)
            // keyLogForm.setValue('employee.department',result.data?.employee.department as DepartmentArrayType)
         
        }
      }
    );
    } catch (error) {
      console.error('Failed to search KeyLog:', error);
    }
  };

  function updateKeyLog(values: keyLogFormSchemeType) {

    startTransition(async () => {
      try {

        
        let result;
        if (!isretrive) {
           result= await updateKeyLogAction(values);
        }else{
          result = await retriveKeyLogAction(values.keyNumber)
        }
        if (result.success) {
          toast.success('מפתח עודכן בהצלחה');
          router.push('/keys');
        } else {
          toast.error('שגיאה', {
            description: result.message
          });
        }

        keyLogForm.reset()
      } catch (error) {
        toast.error('שגיאה', {
          description: error instanceof Error ? error.message : 'קרתה תקלה'
        });
      }
    });
  }

  return{
    keyLogForm,
    isPending,
    searchKey,
    updateKeyLog,
    isretrive,
    renderField
  }

}