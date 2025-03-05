'use server';

import { Employee, Guard, Prisma } from '@prisma/client';
import {
  deleteEmployee,
  getAllEmployees,
  getEmployeeByEmployeeId,
  getGuard,
  updateEmployees,
  updateGuard
} from '../db/DBEmployee';
import { revalidatePath } from 'next/cache';
import { convertToEmployee, readCsvFile } from '../utils/fileReader';
import {
  contractorFormSchema,
  guardFormSchema,
  guardFormSchemaType
} from '../schemes';
import { employeeFormSchema } from '../schemes';
import { employeeFormSchemaType } from '../schemes';
import { ActionResponseHandler } from './utils';
import { RecurrenceRule } from 'node-schedule';
import SchedulingService from '../utils/schedulingService';
import { date } from 'zod';
import { guardCourseReminder } from '../db/scheduleJobs';

const validateEmployeeForm = (formData: employeeFormSchemaType) => {
  const employeeData = employeeFormSchema.safeParse({
    ...formData
  });

  return {
    success: employeeData.success,
    errors: {
      employee: employeeData.error
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
      guard: guardData.error
    }
  };
};

export async function deleteEmployeeAction(employeeId: string) {
  try {
    const employee = await deleteEmployee(employeeId);

    revalidatePath('/employees');
    if (!employee.success) {
      throw new Error('לא ניתן למחוק עובד זה');
    }

    return ActionResponseHandler(true, 'עובד נמחק בהצלחה', employee.data);
  } catch (error) {
    return ActionResponseHandler(false, 'לא ניתן למחוק עובד זה', null);
  }
}

export async function updateEmployeesAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;

    const employeeRows = (await readCsvFile(file, async () => {})) as any;
    const employeesData = convertToEmployee(employeeRows?.data);
    const updatedEmployees = await updateEmployees(employeesData);

    if (updatedEmployees.success) {
      revalidatePath('/employees');
      return ActionResponseHandler(
        true,
        'עובדים עודכנו בהצלחה',
        updatedEmployees.data
      );
    }

    throw new Error('העדכון נכשל');
  } catch (error) {
    return ActionResponseHandler(false, 'העדכון נכשל', null);
  }
}

export async function updateEmployeeAction(formData: employeeFormSchemaType) {
  try {
    const employeeData = validateEmployeeForm(formData);
    if (!employeeData.success) {
      return ActionResponseHandler(false, 'הטופס מכיל שגיאות', null);
    }

    const employee = await updateEmployees([formData]);
    if (employee.success) {
      return ActionResponseHandler(true, 'העדכון בוצע בהצלחה', employee.data);
    } else {
      throw new Error('העדכון נכשל');
    }
  } catch (error) {
    console.error(error);
    return ActionResponseHandler(false, 'העדכון נכשל', null);
  }
}

export async function searchEmployeeAction(searchQuery: string) {
  try {
    const employee = await getEmployeeByEmployeeId(searchQuery);
    if (employee.success) {
      return ActionResponseHandler(true, 'נמצא עובד', employee.data);
    } else {
      throw new Error('לא נמצא עובד עם מספר נתונים אלו');
    }
  } catch (error) {
    return ActionResponseHandler(
      false,
      'לא נמצא עובד עם מספר נתונים אלו',
      null
    );
  }
}

export async function updateGuardAction(formData: guardFormSchemaType) {
  try {
    const guardData = validateGuardForm(formData);

    if (!guardData.success) {
      return ActionResponseHandler(false, 'הטופס מכיל שגיאות', null);
    }

    if (formData.guard.lastCourse) {
      formData.guard.nextCourse = new Date(formData.guard.lastCourse);
      formData.guard.nextCourse.setMonth(
        formData.guard.nextCourse.getMonth() + 6
      );
    }

    const guard = await updateGuard(
      formData as Prisma.EmployeeCreateInput & {
        guard: Prisma.GuardCreateInput;
      }
    );
    if (guard.success && guard.data) {
      guardCourseReminder(
        guard.data as Prisma.EmployeeGetPayload<{include: {guard: true}}>
      );

      revalidatePath('/employees/guards');
      return ActionResponseHandler(true, 'השמירה בוצעה בהצלחה', guard.data);
    }

    throw new Error('השמירה נכשלה');
  } catch (error) {
    return ActionResponseHandler(false, 'השמירה נכשלה', null);
  }
}
