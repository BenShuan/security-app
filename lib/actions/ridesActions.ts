'use server';
import { Prisma } from '@prisma/client';
import { createRideLog, getCompanysName } from '../db/DBRides';
import { rideLogFormScheme, rideLogFormSchemeType } from '../schemes';
import { revalidatePath } from 'next/cache';

const validateRideLogForm = (formData: rideLogFormSchemeType) => {
  const rideLogData = rideLogFormScheme.safeParse({
    ...formData
  });

  return {
    success: rideLogData.success,
    errors: {
      employee: rideLogData.error
    }
  };
};

export async function addRideLogActions(formData: rideLogFormSchemeType) {
  try {
    const employeeData = validateRideLogForm(formData);
    if (!employeeData.success) {
      return { success: false, message: 'הטופס מכיל שגיאות' };
    }


    const employee = await createRideLog({
      action:formData.action,
      reason:formData.reason,
      employee: {
        connect: {
          employeeId: formData.employeeId
        }
      },
      ridesCompany: {
        connect: {
          name: formData.rideCompanyName
        }
      },
      guard: {
        connect: {
          employeeId: formData.guardId
        }
      }
    });

    revalidatePath("/rides")

    if (employee) {
      return { success: true, message: 'העדכון בוצע בהצלחה' };
    } else {
      return { success: false, message: 'העדכון נכשל' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to update employee' };
  }
}

export async function companiesNamesActions() {
  return getCompanysName();
}
