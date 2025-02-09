import prisma from '../prisma';

export const getUserFromDb = async (userName: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        userName: userName
      }
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error: any) {
    console.log('error', error);
  }


};

export const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};
