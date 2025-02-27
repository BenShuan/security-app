// Example with labels and basic validation:
'use client'
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/form/label';
import { Input } from '@/components/ui/input';
import { signInAction } from '@/lib/actions/auth';
import React, { useActionState } from 'react';

function LoginForm() {
  const [state, formAction, pending] = useActionState(signInAction, { success: false, message: "" });
  return (
    <form
      action={formAction}
      className="w-full justify-around flex flex-col gap-12 mt-12 min-w-[300px]
    md:w-1/2 md:mx-auto
  *:h-14 *:rounded-full *:border-2 *:border-secondary  *:text-2xl"
    >
        <Label hidden htmlFor="userName">שם משתמש</Label>
        <Input type="text" name="userName" id="userName" placeholder="שם משתמש" required />
        <Label hidden htmlFor="password">סיסמא</Label>
        <Input type="password" name="password" id="password" placeholder="סיסמא" required />

      <Button disabled={pending} className="w-full bg-secondary">התחבר</Button>
      {!state.success && <p className='text-destructive h-fit border-none text-center'>{state.message}</p>}
    </form>
  );
}

export default LoginForm;
