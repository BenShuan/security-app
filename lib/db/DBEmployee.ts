import { Employee, Prisma } from '@prisma/client';
import prisma from '../prisma';

function handleError(error: any) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error('Prisma known error:', error.message);
    return { success: false, error: error.message };
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    console.error('Validation error:', error.message);
    return { success: false, error: error.message };
  } else {
    console.error('Error fetching employee:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function createEmployee(employeeData: Prisma.EmployeeCreateInput) {
  try {
    const employee = await prisma.employee.create({
      data: employeeData
    });
    return employee;
  } catch (error) {
    return handleError(error);
  }
}

export async function getEmployeeByEmployeeId(employeeId: string) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { employeeId: employeeId }
    });
    return { success: true, data: employee };
  } catch (error) {
    return handleError(error);
  }
}

export async function getEmployeeByIdNumber(idNumber: string) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { idNumber }
    });
    return employee;
  } catch (error) {
    return handleError(error);
  }
}

export async function getAllEmployees() {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        manager: true
      }
    });
    return employees;
  } catch (error) {
    throw error;
  }
}

export async function updateEmployees(employees: Employee[]) {
  try {
    const employeesData = employees.map(async (employee) => {
      const updatedEmployee = await prisma.employee.upsert({
        where: { employeeId: employee.employeeId },
        create: employee as Prisma.EmployeeCreateInput,
        update: employee as Prisma.EmployeeUpdateInput
      });

      return updatedEmployee;
    });

    return employeesData;
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteEmployee(employeeId: string) {
  try {
    const employee = await prisma.employee.delete({
      where: { employeeId: employeeId }
    });
    return employee;
  } catch (error) {
    console.log('error', error);
    return handleError(error);
  }
}
