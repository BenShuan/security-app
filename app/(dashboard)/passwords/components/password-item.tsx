'use client';
import AlertModal from '@/components/alert-modal';
import Modal from '@/components/modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getPasswordAction } from '@/lib/actions/passwordsActions';
import { Password } from '@prisma/client';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@radix-ui/react-hover-card';
import { EyeIcon } from 'lucide-react';
import React, { useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';
import PasswordForm from './password-form';

function PasswordItem({ password }: { password: Password }) {
  const [openForm, setOpenForm] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [decryptedPassword, setDecryptedPassword] = useState({
    password: '',
    secondPassword: ''
  });

  const employeeIdRef = useRef<HTMLInputElement>(null);
  const EmployeeIdInput = (
    <Input ref={employeeIdRef} placeholder="הזן מספר עובד" />
  );

  const handleAction = () => {
    if (!employeeIdRef.current?.value) {
      toast.error('יש להזין מספר עובד');
    }

    setOpenForm(false);

    startTransition(async () => {
      const result = await getPasswordAction(
        employeeIdRef.current?.value || '',
        password.id
      );
      if (result.success) {
        setOpenPassword(true);
        setDecryptedPassword({
          password: result.data?.password || '',
          secondPassword: result.data?.seconde_password || ''
        });
      } else {
        toast.error(result?.error);
      }
    });
  };

  return (
    <>
      <div className=" border-2 flex gap-4 w-full py-2 px-4 rounded-md hover:shadow-lg hover:scale-[103%] transition-all duration-300">
        <Button
          className="p-0 m-0 h-fit"
          onClick={() => setOpenForm(true)}
          variant={'ghost'}
        >
          <EyeIcon />
        </Button>
        <div className="flex flex-col gap-1">
          <p className="font-bold">{password.name}</p>
          <p className="font-semibold text-muted-foreground">{`שם משתמש : ${password.userName}`}</p>
          <p className="text-muted-foreground">{`תיאור : ${password.description || ''}`}</p>
        </div>
      </div>

      <AlertModal
        title={'הצג סיסמה ל - ' + password.name}
        description={EmployeeIdInput}
        action="הצג "
        cancel="ביטול"
        triggerHidden={openForm}
        cancelFunction={() => setOpenForm(false)}
        actionFunction={handleAction}
      />

      <Modal
        title={password.name}
        open={openPassword}
        onOpenChange={() => {
          setOpenPassword(false);
          setDecryptedPassword({
            password: '',
            secondPassword: ''
          });
        }}
      >
        <CardContent>
          <PasswordForm
            password={{
              ...password,
              password: decryptedPassword.password,
              seconde_password: decryptedPassword.secondPassword
            }}
          />
        </CardContent>
      </Modal>
    </>
  );
}

export default PasswordItem;
