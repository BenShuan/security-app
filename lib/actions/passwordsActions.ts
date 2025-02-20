'use server';

import { Password } from '@prisma/client';
import { createOrUpdatePassword, getPasswordById } from '../db/DBPassword';
import prisma from '../prisma';
import {
  handleDecryption,
  handleEncryption,
  saltAndHashPassword
} from '../utils/password';
import { passwordFormSchema, passwordFormSchemaType } from '../schemes';
import { revalidatePath } from 'next/cache';
import { init } from 'next/dist/compiled/webpack/webpack';

const ValidatPasswordForm = (formData: passwordFormSchemaType) => {
  const password = passwordFormSchema.safeParse({
    ...formData
  });

  return {
    success: password.success,
    errors: password.error
  };
};

export const getPasswordAction = async (
  employeeId: string,
  passwordId: string
) => {
  try {
    //check the gurad employeeId are not empty and belong the same site
    const guard = await prisma.guard.findFirst({
      where: { employeeId: employeeId }
    });

    if (!guard) {
      throw new Error('מספר עובד שגוי');
    }

    //if good get the passwords

    const passwords = await getPasswordById(passwordId);

    const decryptedPassword = await handleDecryption({
      encryptedData: passwords.data?.password,
      initVector: passwords.data?.initParams
    });

    console.log('dec', decryptedPassword);

    const decryptedSecondPassword = await handleDecryption({
      encryptedData: passwords.data?.seconde_password,
      initVector: passwords.data?.initParams
    });

    if (passwords.data) {
      passwords.data.password = decryptedPassword;
      passwords.data.seconde_password = decryptedSecondPassword;
    }

    return {
      success: true,
      data: passwords.data
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
};

export const updatePasswordAction = async (
  password: passwordFormSchemaType
): Promise<{
  success: boolean;
  data?: Password;
  error?: string;
}> => {
  try {
    const passwordForm = ValidatPasswordForm(password);

    if (!passwordForm.success) {
      throw new Error(passwordForm.errors?.toString());
    }

    console.log('password.initParams', password.initParams);

    if (password.initParams === '') {
      password.initParams = crypto
        .getRandomValues(new Uint8Array(12))
        .toString();
      console.log('password.initParams', password.initParams);
    }

    const hashedPassword = await handleEncryption(
      password.password,
      password.initParams
    );
    const hashedSecondPassword = await handleEncryption(
      password.seconde_password || '',
      password.initParams
    );

    // const hashedInitParams = await handleEncryption(
    //   password.initParams,hashedPassword.encryptedData)

    const newPassword = await createOrUpdatePassword({
      ...(password as Password),
      // initParams: hashedInitParams.encryptedData,
      password: hashedPassword.encryptedData,
      seconde_password: hashedSecondPassword.encryptedData,
      slug: `${password.name}-${password.userName}`
    });

    if (!newPassword.success) {
      return {
        success: false,
        error: 'Failed to update password'
      };
    }

    revalidatePath('/passwords');

    return {
      success: true,
      data: newPassword.data as Password
    };
  } catch (error: any) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
