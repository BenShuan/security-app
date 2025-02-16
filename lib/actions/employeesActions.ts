'use server';

import { Employee, Prisma } from '@prisma/client';
import { deleteEmployee, getAllEmployees, getEmployeeByEmployeeId, updateEmployees, updateGuard } from '../db/DBEmployee';
import { revalidatePath } from 'next/cache';
import { convertToEmployee, readCsvFile } from '../utils/fileReader';
import { contractorFormSchema, guardFormSchema, guardFormSchemaType } from '../schemes';
import { employeeFormSchema } from '../schemes';
import { employeeFormSchemaType } from '../schemes';

const validateEmployeeForm = (formData: employeeFormSchemaType) => {
  const employeeData = employeeFormSchema.safeParse({
    ...formData
  });

  return {
    success: employeeData.success,
    errors: {
      employee: employeeData.error,
    }
    };
  };

  const validateGuardForm = (formData: guardFormSchemaType) => {
    const guardData = guardFormSchema.safeParse({
      ...formData
    });

    return {
      success: guardData.success,
      errors: {
        guard: guardData.error,
      }
    };
  }

export async function deleteEmployeeAction(employeeId: string) {
  try {
    console.log(employeeId);
    const employee = await deleteEmployee(employeeId);
    console.log(employee);

    revalidatePath('/employees');
    return { success: true, message: 'Employee deleted successfully' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to delete employee' };
  }
}

export async function updateEmployeesAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;

    await readCsvFile(file,async (employees) => {
      const employeesData = convertToEmployee(employees.data);
      const updatedEmployees = await updateEmployees(employeesData);
    });
    
    revalidatePath('/employees');
    return { success: true, message: 'העדכון בוצע בהצלחה' };

  } catch (error) {
    console.error(error);
    return { success: false, message: 'העדכון נכשל' };
  }
}

export async function updateEmployeeAction(formData: employeeFormSchemaType) {
  try {
    const employeeData = validateEmployeeForm(formData);
    if (!employeeData.success) {
      return { success: false, message: 'הטופס מכיל שגיאות' };
    }
    
    const employee = await updateEmployees([ formData]);
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

export async function searchEmployeeAction(searchQuery: string) {
  try {
    const employee = await getEmployeeByEmployeeId(searchQuery);
    if (employee?.success) {
      return { success: true, data: employee.data };
    } else {
      return { success: false, message: employee?.error };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to search employee' };
  }
}

export async function updateGuardAction(formData: guardFormSchemaType) {
  try {
    const guardData = validateGuardForm(formData);

    if (!guardData.success) {
      return { success: false, message: 'הוזנו שגיאות בטופס' };
    }

    const guard = await updateGuard(formData as Prisma.EmployeeCreateInput & {guard: Prisma.GuardCreateInput});
    if (guard) {
      revalidatePath('/employees/guards');
      return { success: true, message: 'העדכון בוצע בהצלחה' };
    } else {
      return { success: false, message: 'העדכון נכשל' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'העדכון נכשל' };
  }
}
