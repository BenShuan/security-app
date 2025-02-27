'use server';

import { getUserFromDb } from '@/lib/db/DBUsers';
import { createToken, deleteToken, requireAuth } from '../auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { SiteArrayType } from '../schemes';
import { comparePasswords } from '../utils/password';
import { Role } from '@prisma/client';

export async function signInAction(formData: FormData): Promise<void> {
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
  } catch (error: any) {
    console.error(error);
    urlRedirect = '/login?error=ServerError';
  }

  redirect(urlRedirect);
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
