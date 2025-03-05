import { error } from 'console';
import prisma from '../prisma';
import { handleError } from './utils';
import { Prisma, User } from '@prisma/client';
import { sendEmail } from '../utils/nodeMailer';

export const getUserFromDb = async (userName: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        userName: userName,
        deletedAt:null,
        isActive:true
      }
    });
    if (!user) {
      throw new Error('User not found');
    }


    return {
      success:true,
      data:user,
      error:""
    };
  } catch (error: any) {
    return handleError(error)
  }


};

export const deleteUser = async (userName: string) => {
  try {
    const user = await prisma.user.update({
      where: {
        userName: userName
      },
      data:{
        isActive:false,
        deletedAt:new Date()
      }
    });
    if (!user) {
      throw new Error('Error deleting user');
    }
    return {
      success:true,
      data:user,
      error:""
    };
  } catch (error: any) {
    return handleError(error)
  }


};



export const createOrUpdateUser = async (user: User) => {
  try {
    console.log('user', user)
    const newUser = await prisma.user.upsert({
      where: {
        userName:user.userName
      },
      create:user,
      update:{
        ...user,
        deletedAt:null,
        isActive:true
      }
    });
    console.log('newUser', newUser)


    return {
      success:true,
      data:newUser,
      error:""
    };
  } catch (error: any) {
    return handleError(error)
  }


};

export const getAllUsers = async (filter?:Prisma.UserWhereInput) => {
  const users = await prisma.user.findMany({
    where:{
      ...filter,
      deletedAt:null,
      isActive:true,
    },
    omit:{
      password:true
    }
    
  });
  return users as User[];
};
