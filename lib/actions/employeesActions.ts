'use server';

import { Prisma } from '@prisma/client';
import { deleteEmployee, getAllEmployees, updateEmployees } from '../db/DBEmployee';
import { revalidatePath } from 'next/cache';
import { readCsvFile } from '../utils/fileReader';

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

    readCsvFile(file, (employees) => {
      console.log(employees.data);
    });



    // update employees in the database
    // const updatedEmployees = await updateEmployees(employees);

    return { success: true, message: 'העדכון בוצע בהצלחה' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'העדכון נכשל' };
  }
}
