import { Contractor, Employee, Prisma, PrismaClient } from '@prisma/client';
import { createEmployee } from './DBEmployee';
import prisma from '../prisma';

export async function getContractors() {
  try {
    const contractors = await prisma.contractor.findMany({
      include: {
        employee: {
          include: {
            manager: true
          }
        }
      }
    });
    return contractors;
  } catch (error) {
    console.error('Error fetching contractors:', error);
    throw error;
  }
}

export async function getContractorById(id: number) {
  try {
    const contractor = await prisma.contractor.findUnique({
      where: { id },
      include: {
        employee: true
      }
    });
    return contractor;
  } catch (error) {
    console.error('Error fetching contractor:', error);
    return null;
  }
}

export async function createContractor(data: Prisma.ContractorCreateInput) {
  try {
    return await prisma.contractor.create({
      data,
      include: {
        employee: true
      }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('קיים כבר קבלן עם פרטים אלו');
      }
    }
    throw error;
  }
}

export async function updateContractor(id: number, authExpiryDate: Date) {
  try {
    const contractor = await prisma.contractor.update({
      where: { id },
      data: {
        authExpiryDate
      },
      include: {
        employee: true
      }
    });
    return contractor;
  } catch (error) {
    console.error('Error updating contractor:', error);
    throw error;
  }
}

export async function deleteContractor(id: number) {
  try {
    const contractor = await prisma.contractor.delete({
      where: { id }
    });
    return contractor;
  } catch (error) {
    console.error('Error deleting contractor:', error);
    throw error;
  }
}
