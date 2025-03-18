'use server';

import { User } from '@prisma/client';
import { createOrUpdateUser, deleteUser, getUserFromDb } from '../db/DBUsers';
import { userSchema, userSchemaType } from '../schemes';
import { comparePasswords, saltAndHashPassword } from '../utils/password';
import { revalidatePath } from 'next/cache';
import { ActionResponse, ActionResponseHandler } from './utils';
import { sendEmail } from '../utils/nodeMailer';
import ResetPasswordEmail from '@/components/email-tamplates/restet-password-email';

const validateUserForm = (formData: userSchemaType) => {
  const userData = userSchema.safeParse({
    ...formData
  });

  return {
    success: userData.success,
    errors: {
      employee: userData.error
    }
  };
};

export async function getUserAction(userId: string) {
  try {
    const user = await getUserFromDb(userId);
    if (user?.success) {
      return ActionResponseHandler(true, 'משתמש נמצא', user.data);
    } else {
      return ActionResponseHandler(false, user?.error);
    }
  } catch (error) {
    console.error(error);
    return ActionResponseHandler(false, 'לא נמצא משתמש');
  }
}

export async function deleteUserAction(userName: string) {
  try {
    const user = await deleteUser(userName);
    if (user?.success) {
      revalidatePath('/users');
      return ActionResponseHandler(true, `${userName} נמחק בהצלחה`, user.data);
    } else {
      return ActionResponseHandler(false, user?.error);
    }
  } catch (error) {
    console.error(error);
    return ActionResponseHandler(false, 'בעיה במחיקת המשתמש');
  }
}

export const updateUserAction = async (user: userSchemaType) => {
  try {
    const userForm = validateUserForm(user);

    if (!userForm.success) {
      throw new Error(userForm.errors?.toString());
    }

    const hashedPassword = await saltAndHashPassword(user.password);

    const newPassword = await createOrUpdateUser({
      ...(user as User),
      password: hashedPassword
    });

    if (!newPassword.success) {
      return ActionResponseHandler(false, newPassword.error);
    }

    revalidatePath('/users');

    return ActionResponseHandler(true, 'משתמש עודכן בהצלחה', newPassword.data);
  } catch (error: any) {
    return ActionResponseHandler(
      false,
      error.message || 'בעיה בעדכון המשתמש',
      undefined
    );
  }
};

export async function updateUserPassWordAction(initState: ActionResponse<User>, formData: FormData) {
  try {
    const userName = formData.get('userName') as string;
    const code = formData.get('code') as string; // You might be missing the code logic here.
    const password = formData.get('password') as string;
    const confPassword = formData.get('confirmPassword') as string;

    if (!userName || !code || !password || !confPassword) {
      return ActionResponseHandler(false, 'יש למלא את כל הפרטים');
    }

    if (password !== confPassword) {
      return ActionResponseHandler(false, 'הסיסמאות אינן תואמות');
    }

    const user = await getUserFromDb(userName);

    if (!user.success || !user.data) {
      return ActionResponseHandler(false, user.error || 'משתמש לא קיים');
    }

    if (!(await comparePasswords(code, user.data.password))) {
      return ActionResponseHandler(false, 'קוד לא תואם');
    }

    // Add you logic for checking the code here

    const hashedPassword = await saltAndHashPassword(password);

    const updatedUser = await createOrUpdateUser({
      ...user.data,
      password: hashedPassword
    });

    if (!updatedUser.success) {
      return ActionResponseHandler(false, updatedUser.error);
    }
    revalidatePath('/users');
    return ActionResponseHandler(true, 'הסיסמא עודכנה בהצלחה');

  } catch (error: any) {
    console.error('Error in updateUserPassWord:', error);
    return ActionResponseHandler(
      false,
      error.message || 'בעיה בעדכון הסיסמא',
      undefined
    );
  }
};

export async function resetPasswordAction(userName: string) {
  try {
    const user = await getUserFromDb(userName);

    if (!user.success) {
      throw new Error(user.error);
    }

    //generat temp password
    const newPass = Math.random().toString(20).slice(-8);
    const newHashPass = await saltAndHashPassword(newPass);

    //update user passsword
    if (user.data) {
      const updatedUser = await createOrUpdateUser({
        ...user.data,
        password: newHashPass
      });

      //send mail with the current temp password
      await sendEmail({
        subject: 'איפוס סיסמא עבור ' + user.data?.userName,
        to: user.data?.email,
        html: await ResetPasswordEmail(user.data, newPass)
      });
    }
    return ActionResponseHandler(true, 'סיסמא חדשה נשלחה במייל');
  } catch (error) {
    console.error(error);
    return ActionResponseHandler(false, 'בעיה באיפוס הסיסמא');
  }
}
