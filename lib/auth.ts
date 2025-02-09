// Delete this entire file
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { redirect } from 'next/navigation';
import { saltAndHashPassword } from './utils/password';
import prisma from './prisma';
import { Role } from '@prisma/client';

const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET);
const cookieName = 'auth-token';

export async function createToken(
  userId: number,
  userName: string,
  role: string
) {
  // Create the session token
  const token = await new SignJWT({ userId, userName, role })
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
    return verified.payload as {
      userId: number;
      userName: string;
      role: string;
    };
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

interface RegisterUserData {
  email: string;
  password: string;
  userName: string;
}

export async function registerUser({
  password,
  userName
}: RegisterUserData) {
  // Hash the password before storing
  const hashedPassword = await saltAndHashPassword(password);

  try {
    // Add user to your database (example using prisma)
    const user = await prisma.user.create({
      data: {
        userName,
        password: hashedPassword,
        role: 'guard' as Role // default role
      }
    });



    // Automatically sign in the user after registration
    await createToken(user.id, user.userName, user.role);

    return { success: true, user };
  } catch (error: any) {
    // Handle specific errors (like duplicate email)
    if (error.code === 'P2002') {
      throw new Error('Email already exists');
    }
    throw error;
  }
}
