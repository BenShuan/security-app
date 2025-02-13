'use server';

import { revalidatePath } from 'next/cache';
import {
  createContractor,
  getContractorByIdeNumber,
  updateContractor
} from '@/lib/db/DBContractors';
import {
  contractorFormSchema,
  contractorFormSchemaType,
  DepartmentArrayType,
  employeeFormSchema
} from '@/lib/schemes';
import { Employee, Prisma } from '@prisma/client';
import { redirect } from 'next/navigation';
import prisma from '../prisma';

const validateContractorForm = (formData: contractorFormSchemaType) => {
  const employeeData = employeeFormSchema.safeParse({
    ...formData.employee
  });

  const contractorData = contractorFormSchema.safeParse({
    companyName: formData.companyName,
    authExpiryDate: new Date(),
    employee: employeeData.data
  });

  return {
    success: employeeData.success && contractorData.success,
    errors: {
      employee: employeeData.error,
      contractor: contractorData.error
    }
  };
};

export async function createContractorAction(
  formData: contractorFormSchemaType
) {
  try {
    const { success, errors } = validateContractorForm(formData);

    if (!success) {
      return {
        success: false,
        error: errors
      };
    }

    console.log('formData', formData);

    const managerId = await prisma.employee.findFirst({
      where: {
        AND: {
          department: formData.employee.department as DepartmentArrayType,
          isManager: true
        }
      }
    });

    formData.employee.managerId = managerId?.id ;

    console.log('formData', formData);

    const result = await createContractor({
      companyName: formData.companyName,

      authExpiryDate: formData.authExpiryDate,
      employee: {
        create: formData.employee
      }
    } as Prisma.ContractorCreateInput);

    revalidatePath('/contractors');
    return { success: true, contractor: result };
  } catch (error) {
    console.error('Failed to create contractor:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'קרתה תקלה בלתי צפויה'
    };
  }
}

export async function updateContractorAction(
  formData: contractorFormSchemaType
) {
  const { success, errors } = validateContractorForm(formData);

  if (!success) {
    return { success: false, error: errors };
  }

  const managerId = await prisma.employee.findFirst({
    where: {
      AND: {
        department: formData.employee.department as DepartmentArrayType,
        isManager: true
      }
    }
  });

  formData.employee.managerId = managerId?.id || null;

  try {
    const result = await updateContractor(
      formData as Prisma.ContractorGetPayload<{
        include: { employee: true };
      }>
    );

    revalidatePath('/contractors');
    return { success: true, contractor: result };
  } catch (error) {
    console.error('Failed to update contractor:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'קרתה תקלה בלתי צפויה'
    };
  }
}

export async function addMonthToContractorAction(employeeId: string) {
  console.log(employeeId);
  try {
    await prisma.contractor.update({
      where: { employeeId },

      data: {
        authExpiryDate: {
          set: new Date(new Date().setMonth(new Date().getMonth() + 1))
        }
      }
    });

    console.log('Contractor updated successfully');

    revalidatePath('/contractors');
    return { success: true };
  } catch (error) {
    console.error('Failed to add month to contractor:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'קרתה תקלה בלתי צפויה'
    };
  }
}

export async function searchContractorAction(
  searchQuery: string
): Promise<Prisma.ContractorGetPayload<{
  include: { employee: { include: { manager: true } } };
}> | null> {
  try {
    
    const contractor = await getContractorByIdeNumber(searchQuery);

    return contractor;
  } catch (error) {
    console.error('Failed to search contractor:', error);
    return null;
  }
}
