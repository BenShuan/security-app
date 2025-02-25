import { Password } from '@prisma/client';
import prisma from '../prisma';
import { addSiteFilter, handleError } from './utils';
import { requireAuth } from '../auth';




export const getPasswordsInGroups = async () => {
  try {
    const passwords = await prisma.password.findMany({
      select: {
        id: true,
        group: true,
        name: true,
        userName: true,
        password: false,
        seconde_password: false,
        description: true,
        site: true,
        createdAt: true,
        updatedAt: true
      }
    });
    const groupedPass = Object.entries(Object.groupBy(passwords, ({ group }) => group));

    return groupedPass as Array<[string, Password[]]>;
  } catch (error) {
    return [];
  }
};

export const getPasswordById = async (id: string) => {
  try {
    const password = await prisma.password.findFirst({
      where: {
        id
      }
    });

    return {
      success: true,
      data: password as Password
    };
  } catch (error) {
    return handleError(error);
  }
};

export const createOrUpdatePassword = async (password: Password) => { 

  try {
    const newPassword = await prisma.password.upsert({
      where: {
        slug: password.slug
      },
      update: { ...password },
      create: { ...password }
    });

    return {
      success: true,
      data: newPassword as Password
    };

  } catch (error) {
    return handleError(error);
  }

}



