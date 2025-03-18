'use client';
import { Button } from '@/components/ui/button';
import { resetPasswordAction } from '@/lib/actions/userActions';
import React, { useActionState } from 'react';

const ResetPasswordButton = ({  userName }: { userName: string }) => {
  const [state, formAction, isPending] = useActionState(
    resetPasswordAction.bind(null, userName),
    {
      success: true,
      message: ''
    }
  );

  return (
    <form action={formAction}>
      <Button
        disabled={isPending}
        variant={'link'}
        className="text-destructive"
      >
        אפס סיסמא
      </Button>
    </form>
  );
};

export default ResetPasswordButton;
