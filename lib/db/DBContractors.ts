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

prisma.$extends({
  model: {
    contractor: {
      async updateAuthExpiryDate({ employeeId }: { employeeId: string }) {
        const contractor = await prisma.contractor.update({
          where: { employeeId },
          data: {
            authExpiryDate: new Date(
              new Date().setMonth(new Date().getMonth() + 1)
            )
          }
        });
        return contractor;
      }
    }
  }
});

export async function updateContractor(
  updatedContractor: Prisma.ContractorGetPayload<{
    include: { employee: true };
  }>
) {
  try {

    const employee = await prisma.employee.update({
      where: { idNumber: updatedContractor.employee.idNumber },
      data: {
        ...updatedContractor.employee,
      }
    });
    console.log('update employee', employee);


    if (!employee) {
      throw new Error('Employee not found');
    }
    const contractor = await prisma.contractor.update({
      where: { employeeId: updatedContractor.employee.idNumber },

      data: {
        authExpiryDate: updatedContractor.authExpiryDate,
        companyName: updatedContractor.companyName
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
