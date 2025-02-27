
// Components
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form/form';

// Types and utilities
import { SiteArray } from '@/lib/schemes';
import useAuth from '@/lib/utils/hooks/useAuth';
import { useUserForm } from '@/lib/utils/hooks/useUserForm';



function UserForm() {

  const {getRoleByUserRole} = useAuth()

 

  const userFields = [
    { key: 'userName', type: 'string', label: 'שם משתמש' },
    { key: 'password', type: 'string', label: 'סיסמה' },
    { key: 'email', type: 'string', label: 'אימייל' },
    {
      key: 'role',
      type: 'enum',
      options: getRoleByUserRole()  ,
      label: 'תפקיד'
    },
    {
      key: 'site',
      type: 'enum',
      options: SiteArray.options,
      label: 'אתר'
    }
  ] as const;

  const {
    form,
    renderField,
    updateUser,
    isPending,
    isUpdating,
  } = useUserForm();



  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(updateUser )}
        className=" grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
      >
        {userFields.map(renderField)}
        <Button
          type="submit"
          className="col-span-1 sm:col-span-2"
          disabled={isPending}
        >
          {isPending ? 'טוען...' : isUpdating ? 'עדכן פרטים' : 'הוסף קבלן'}
        </Button>
      </form>
    </Form>
  );
}

export default UserForm;
