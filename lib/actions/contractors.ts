'use server';

import { revalidatePath } from 'next/cache';
import { createContractor, updateContractor } from '@/lib/db/DBContractors';
import {
  contractorFormSchema,
  contractorFormSchemaType,
  employeeFormSchema
} from '@/lib/schemes';
import { Department, Employee, Prisma, Site } from '@prisma/client';
import { redirect } from 'next/navigation';

export async function createContractorAction(
  formData: contractorFormSchemaType
) {
  try {
    const employeeData = employeeFormSchema.safeParse({
      ...formData.employee
    });

    const contractorData = contractorFormSchema.safeParse({
      companyName: formData.companyName,
      authExpiryDate: new Date(),
      employee: employeeData.data
    });

    if (!employeeData.success || !contractorData.success) {
      return { 
        success: false, 
        error: 'נתונים לא תקינים' 
      };
    }

    const result = await createContractor({
      companyName: contractorData.data.companyName,
      authExpiryDate: contractorData.data.authExpiryDate,
      employee: {
        create: employeeData.data
      }
    } as Prisma.ContractorCreateInput);

    revalidatePath('/contractors');
    return { success: true };
    
  } catch (error) {
    console.error('Failed to create contractor:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'קרתה תקלה בלתי צפויה'
    };
  }
}

export async function updateContractorAction(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  const employeeId = parseInt(formData.get('employeeId') as string);
  const authExpiryDate = new Date(formData.get('authExpiryDate') as string);

  try {
    await updateContractor(id, authExpiryDate);

    revalidatePath('/contractors');
  } catch (error) {
    console.error('Failed to update contractor:', error);
    return { success: false };
  }
}
