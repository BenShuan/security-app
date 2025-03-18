'use server';

import { getUserFromDb } from '@/lib/db/DBUsers';
import { createToken, deleteToken, requireAuth } from '../auth';
import { revalidatePath } from 'next/cache';
import { SiteArray, SiteArrayType } from '../schemes';
import { comparePasswords, saltAndHashPassword } from '../utils/password';
import { Role, User } from '@prisma/client';
import { redirect } from 'next/navigation';
import prisma from '../prisma';

export async function signInAction(
  initState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  let urlRedirect = '/';
  try {
    const userName = formData.get('userName') as string;
    const password = formData.get('password') as string;

    const user = await getUserFromDb(userName);

    // && (await comparePasswords(password, user.password))
    if (
      user.success &&
      user.data &&
      (await comparePasswords(password, user.data.password))
    ) {
      await createToken(
        user.data.id,
        user.data.userName,
        user.data.role,
        user.data.site as SiteArrayType
      );
      revalidatePath('/');
    } 
    else{
      throw new Error('פרטי משתמש שגויים')
    }
  } catch (error: any) {

    return { success: false, message: 'פרטי משתמש שגויים' };
  }

   redirect('/')
  
}

export async function signOutAction(): Promise<void> {
  // Clear any session/token logic here
  deleteToken();
  redirect('/login');
}
export const checkManeger = async () => {
  const user = await requireAuth();
  return user.role !== Role.guard;
};


export async function signUpAction({
  password,
  userName,
  site,
  role,
  email
}: User) {
  // Hash the password before storing
  const hashedPassword = await saltAndHashPassword(password);

  try {
    // Add user to your database (example using prisma)
    const user = await prisma.user.create({
      data: {
        userName,
        email: email,
        password: hashedPassword,
        site: site || SiteArray.Values['אור עקיבא'],
        role: (role as Role) || ('guard' as Role) // default role
      }
    });

    // Automatically sign in the user after registration
    await createToken(
      user.id,
      user.userName,
      user.role,
      user.site as SiteArrayType
    );

    return { success: true, user };
  } catch (error: any) {
    // Handle specific errors (like duplicate email)
    if (error.code === 'P2002') {
      throw new Error('Email already exists');
    }
    throw error;
  }
}

