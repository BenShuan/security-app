'use client';

import FormFieldInput from '@/components/ui/form/form-field-input';
import { FormField } from '@/components/ui/form/form';
import FormFieldDate from '@/components/ui/form/form-field-date';
import FormFieldSelect from '@/components/ui/form/form-field-select';
import {
  passwordFormSchema,
  passwordFormSchemaType,
  PasswordGroupArrayType,
  SiteArrayType
} from '@/lib/schemes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Password } from '@prisma/client';
import { updatePasswordAction } from '@/lib/actions/passwordsActions';

interface PasswordFormProps {
  password: Password | null;
}

export function usePasswordForm({ password }: PasswordFormProps) {
  const router = useRouter();
  const params = useSearchParams();

  const defaultGroup = params.get("group") || password?.group;

  const [isUpdating, setIsUpdating] = useState(!!password);
  const [isPending, startTransition] = useTransition();

  const form = useForm<passwordFormSchemaType>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      ...password,
      group: defaultGroup as PasswordGroupArrayType,
      site: password?.site as SiteArrayType
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
            maxLength: 30
            // disabled: !isEdit && attr.key !== 'employeeId'
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

  function updatePassword(values: passwordFormSchemaType) {
    startTransition(async () => {
      try {
        const result = await updatePasswordAction(values);

        // console.log('result', result)
        
        if (result.success) {
          toast.success('סיסמא עודכנה בהצלחה');
          router.push('/passwords');
        } else {
          throw new Error(result.error);
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
    updatePassword,
    renderField,
    isUpdating,
    isPending
  };
}
