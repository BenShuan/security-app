
import bcrypt from 'bcryptjs';
const SALT_ROUNDS = 10;

export async function saltAndHashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
  // return '123456'
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
  // return true
}
