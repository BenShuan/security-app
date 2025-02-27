'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signInAction } from '@/lib/actions/auth';
import React, { useActionState } from 'react';

function LoginForm() {
  const [state, formAction,pending]=useActionState(signInAction,{success:false,message:""})
  return (
    <form
      action={formAction}
      className="w-full justify-around flex flex-col gap-12 mt-12 min-w-[300px]
    md:w-1/2 md:mx-auto
  *:h-14 *:rounded-full *:border-2 *:border-secondary  *:text-2xl"
    >
      <Input type="text" name="userName" placeholder="שם משתמש" />
      <Input type="password" name="password" placeholder="סיסמא" />

      <Button disabled={pending} className="w-full bg-secondary">התחבר</Button>
      {!state.success&&<p className='text-destructive h-fit border-none text-center'>{ state.message }</p>}
    </form>
  );
}

export default LoginForm;
