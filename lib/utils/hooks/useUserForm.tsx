'use client';

import FormFieldInput from '@/components/ui/form/form-field-input';
import { FormField } from '@/components/ui/form/form';
import FormFieldDate from '@/components/ui/form/form-field-date';
import FormFieldSelect from '@/components/ui/form/form-field-select';
import {
  passwordFormSchema,
  passwordFormSchemaType,
  RoleArrayType,
  SiteArrayType,
  userSchema,
  userSchemaType
} from '@/lib/schemes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Password, Role } from '@prisma/client';
import { updatePasswordAction } from '@/lib/actions/passwordsActions';
import useAuth from './useAuth';
import { getUserAction, updateUserAction } from '@/lib/actions/userActions';

export function useUserForm() {
  const router = useRouter();
  const params = useSearchParams();

  const { user } = useAuth();

  const isEdit = Boolean(params.get('edit'));
  const userId = params.get('user-id');

  const [isUpdating, setIsUpdating] = useState(isEdit);
  const [isPending, startTransition] = useTransition();

  const form = useForm<userSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'guard',
      userName: '',
      site: user?.site as SiteArrayType
    }
  });

  useEffect(() => {
    getUserAction(userId || '').then(({ success, data }) => {
      if (success && data) {
        Object.keys(data).forEach((key) => {
          form.setValue(
            key as keyof userSchemaType,
            data[key as keyof userSchemaType],
            {
              shouldValidate: false
            }
          );
        });
      }
    });
  }, []);

  const renderField = (attr: any) => {
    return (
      <FormField
        key={attr.key}
        control={form.control}
        name={attr.key}
        render={({ field }) => {
          const updatedField = {
            ...field,
            maxLength: 30,
            disabled: attr.key === 'site' && user?.role !== Role.admin
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

  function updateUser(values: userSchemaType) {
    startTransition(async () => {
      try {
        const result = await updateUserAction(values);

        if (result.success) {
          toast.success('משתמש עודכן בהצלחה');
          router.push('/users');
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
    updateUser,
    renderField,
    isUpdating,
    isPending
  };
}
