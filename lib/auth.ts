// Delete this entire file
'use server';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { redirect } from 'next/navigation';
import { saltAndHashPassword } from './utils/password';
import prisma from './prisma';
import { Role, User } from '@prisma/client';
import { SiteArray, SiteArrayType } from './schemes';

const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET);
const cookieName = 'auth-token';

export async function createToken(
  userId: string,
  userName: string,
  role: string,
  site: SiteArrayType
) {
  // Create the session token
  const token = await new SignJWT({ userId, userName, role, site })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(secretKey);

  // Set cookie
  const cookieStore = await cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 // 8 hours
  });
}

export async function deleteToken() {
  (await cookies()).delete(cookieName);
}

export async function getSession() {
  const token = (await cookies()).get(cookieName)?.value;

  if (!token) return null;

  try {
    const verified = await jwtVerify(token, secretKey);
    return verified.payload as User;
  } catch {
    // If token is invalid, delete it
    (await cookies()).delete(cookieName);
    return null;
  }
}

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return session;
}

export async function registerUser({ password, userName, site, role }: User) {
  // Hash the password before storing
  const hashedPassword = await saltAndHashPassword(password);

  try {
    // Add user to your database (example using prisma)
    const user = await prisma.user.create({
      data: {
        userName,
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

export const checkManeger = async () => {
  const user = await requireAuth();
  return user.role !== Role.guard;
};
