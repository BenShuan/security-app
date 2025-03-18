'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/form/label';
import { Input } from '@/components/ui/input';
import { resetPasswordAction,updateUserPassWordAction } from '@/lib/actions/userActions';
import { ActionResponse } from '@/lib/actions/utils';
import { cn } from '@/lib/utils/tailwind';
import { User } from '@prisma/client';
import React, { useActionState, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const ResetPassswordForm = () => {
  const childClass = 'h-10 rounded-full border-2 border-secondary text-xl';

  const route = useRouter()
  const [state, formAction, pending] = useActionState(updateUserPassWordAction, {} as ActionResponse<User>);

  const [userName, setUserName] = useState('');

  const handleSendCode = async () => {
    if (!userName) return toast.error('הזן שם משתמש');
    const ans = await resetPasswordAction(userName);
    console.log('ans', ans)
    if (ans.success) {
      toast.success(ans.message);
    } else {
      toast.error(ans.message);
    }
  };

  useEffect(() => {
    
    if (state.success) {
      toast.success(state.message);
      console.log('state', state)
      route.push('login')
       
    }

  }, [state])
   

  return (
    <form
      action={formAction}
      className="w-full justify-around flex flex-col gap-8  min-w-[300px]
    md:w-1/2 md:mx-auto"
    >
      <div className='flex justify-between items-center gap-2'>
        <Input
          type="text"
          name="userName"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className={cn(childClass)}
          placeholder="הזן שם משתמש"
          required
        />
        <Button type="button" className='text-background' variant={'ghost'} onClick={handleSendCode}>
          שלח קוד איפוס
        </Button>
      </div>

      <Input
        type="password"
        name="code"
        id="code"
        className={cn(childClass)}
        placeholder="הזמן סיסמא זמנית"
        required
      /> 
      <Input
        type="password"
        name="password"
        id="password"
        className={cn(childClass)}
        placeholder="סיסמא"
        required
      />  
      <Input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        className={cn(childClass)}
        placeholder="אמת סיסמא"
        required
      />

      <Button
        disabled={pending}
        className={cn(childClass, 'w-full bg-secondary')}
      >
        התחבר
      </Button>
      {!state.success && (
        <p className="text-destructive h-fit border-none text-center">
          {state.message}
        </p>
      )}
    </form>
  );
};

export default ResetPassswordForm;
