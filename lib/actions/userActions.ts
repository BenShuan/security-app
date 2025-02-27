'use server';

import { User } from '@prisma/client';
import { createOrUpdateUser, deleteUser, getUserFromDb } from '../db/DBUsers';
import { userSchema, userSchemaType } from '../schemes';
import { saltAndHashPassword } from '../utils/password';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
      return { success: true, data: user.data };
    } else {
      return { success: false, message: user?.error };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to search employee' };
  }
}

export async function deleteUserAction(userName: string) {
  try {
    const user = await deleteUser(userName);
    if (user?.success) {
      revalidatePath('/users');
      return {
        success: true,
        data: user.data,
        message: `${userName} נמחק בהצלחה`
      };
    } else {
      return { success: false, message: user?.error };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to search employee' };
  }
}

export const updateUserAction = async (
  user: userSchemaType
): Promise<{
  success: boolean;
  data?: User;
  error?: string;
}> => {
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
      return {
        success: false,
        error: 'בעיה בעדכון המשתמש'
      };
    }

    revalidatePath('/users');

    return {
      success: true,
      data: newPassword.data as User
    };
  } catch (error: any) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
