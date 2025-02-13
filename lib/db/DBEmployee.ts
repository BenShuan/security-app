import { Employee, Prisma, Role } from '@prisma/client';
import prisma from '../prisma';
import { DepartmentArray } from '../schemes';

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

export async function getEmployeeByEmployeeId(employeeId: string): Promise< null| {success:boolean,error?:string, data?:Prisma.EmployeeGetPayload<{
  include: {
    manager: true;
  };
}>|null}> {
  try {
    const employee = await prisma.employee.findUnique({
      where: { employeeId },
      include: {
        manager: true
      }
    });
    return { success: true, data: employee };
  } catch (error) {
    return handleError(error);
  }
}

export async function getEmployeeByIdNumber(idNumber: string): Promise< null| {success:boolean,error?:string, data?:Prisma.EmployeeGetPayload<{
  include: {
    manager: true;
  };
}>|null}> {
  try {
    const employee = await prisma.employee.findUnique({
      where: { idNumber },
      include: {
        manager: true
      }
    });
    return { success: true, data: employee };
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

export async function updateEmployees(employees: Prisma.EmployeeCreateInput[]) {
  try {

    console.log(employees);

    const employeesData = await Promise.all(employees.map(async (employee) => {
      const updatedEmployee = await prisma.employee.upsert({
        where: { employeeId: employee.employeeId },
        create: employee ,
        update: employee as Prisma.EmployeeUpdateInput
      });

      return updatedEmployee;
    }));

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


export async function getGuards(): Promise< null| {success:boolean,error?:string|null, data?:Prisma.EmployeeGetPayload<{
  include: {
    guard: true;
  };
}>[]}> {
  try {
    const guards = await prisma.employee.findMany({
      where: {
        department: DepartmentArray.Values['תפעול-אבטחה']
        }
      ,
      include: {
        guard: true
      }
    });
    return { success: true, data: guards, error: null };
  } catch (error) {
    return handleError(error);
  }
}

