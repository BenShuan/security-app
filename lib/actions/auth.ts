'use server';

import { getUserFromDb } from '@/lib/db/DBUsers';
import { createToken, deleteToken, requireAuth } from '../auth';
import { revalidatePath } from 'next/cache';
import { SiteArrayType } from '../schemes';
import { comparePasswords } from '../utils/password';
import { Role } from '@prisma/client';
import { redirect } from 'next/navigation';

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
