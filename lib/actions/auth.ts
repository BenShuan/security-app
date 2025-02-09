'use server';

import { getUserFromDb } from '@/lib/db/DBUsers';
import { comparePasswords } from '@/lib/utils/password';
import { createToken } from '../auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function signInAction(formData: FormData): Promise<void> {

  let urlRedirect = '/';
  try {
    const userName = formData.get('userName') as string;
    const password = formData.get('password') as string;

    const user = await getUserFromDb(userName);
 
    // && (await comparePasswords(password, user.password))
    if (user ) {
      await createToken(user.id, user.userName, user.role);
      revalidatePath('/');
    }

  } catch (error: any) {
    console.error(error);
    urlRedirect = '/login?error=ServerError';
  }

  redirect(urlRedirect);

}

export async function signOutAction(): Promise<void> {
  // Clear any session/token logic here
  redirect('/login');
}
