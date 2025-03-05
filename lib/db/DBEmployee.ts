import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { DepartmentArray } from '../schemes';
import { DBResponseHandler } from './utils';

export async function createEmployee(employeeData: Prisma.EmployeeCreateInput) {
  try {
    const employee = await prisma.employee.create({
      data: employeeData
    });

    if (employeeData.department === DepartmentArray.Values['תפעול-אבטחה']) {
      await prisma.guard.create({
        data: {
          employeeId: employee.employeeId
        }
      });
    }
    return DBResponseHandler(employee, null);
  } catch (error) {
    return DBResponseHandler(null, error);
  }
}

export async function getEmployeeByEmployeeId(employeeId: string) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { employeeId },
      include: {
        manager: true
      }
    });
    return DBResponseHandler(employee, null);
  } catch (error) {
    return DBResponseHandler(null, error);
  }
}

export async function getEmployeeByIdNumber(idNumber: string) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { idNumber },
      include: {
        manager: true
      }
    });
    return DBResponseHandler(employee, null);
  } catch (error) {
    return DBResponseHandler(null, error);
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
    const employeesData = await Promise.all(
      employees.map(async (employee) => {
        const updatedEmployee = await prisma.employee.upsert({
          where: { employeeId: employee.employeeId },
          create: employee,
          update: employee as Prisma.EmployeeUpdateInput
        });

        if (employee.department === DepartmentArray.Values['תפעול-אבטחה']) {
          await prisma.guard.upsert({
            where: { employeeId: employee.employeeId },
            create: {
              employeeId: employee.employeeId
            },
            update: {}
          });
        }

        return updatedEmployee;
      })
    );

    return DBResponseHandler(employeesData, null);
  } catch (error) {
    return DBResponseHandler(null, error);
  }
}

export async function deleteEmployee(employeeId: string) {
  try {
    const employee = await prisma.employee.delete({
      where: { employeeId: employeeId }
    });
    return DBResponseHandler(employee, null);
  } catch (error) {
    return DBResponseHandler(null, error);
  }
}

export async function getGuards() {
  try {
    const guards = await prisma.employee.findMany({
      where: {
        department: DepartmentArray.Values['תפעול-אבטחה']
      },
      include: {
        guard: {
          include: {
            image: true
          }
        }
      }
    });
    return DBResponseHandler(guards, null);
  } catch (error) {
    return DBResponseHandler(null, error);
  }
}

export async function updateGuard(
  guard: Prisma.EmployeeCreateInput & {
    guard: Prisma.GuardCreateInput | Prisma.GuardUpdateInput;
  }
) {
  try {
    const updatedGuard = await prisma.employee.update({
      where: { employeeId: guard.employeeId },
      data: {
        ...guard,
        guard: {
          upsert: {
            where: { employeeId: guard.employeeId },
            create: {
              ...(guard.guard as Prisma.GuardCreateInput),
              createdAt: new Date(),
              updatedAt: new Date()
            },
            update: guard.guard as Prisma.GuardUpdateInput
          }
        }
      },
      include: {
        guard: true
      }
    });
    
    return DBResponseHandler(updatedGuard, null);
  } catch (error) {
    return DBResponseHandler(null, error);
  }
}

export async function getGuard(employeeId: string) {
  try {
    const guard = await prisma.employee.findUnique({
      where: {
        employeeId
      },
      include: {
        guard: true
      }
    });
    return DBResponseHandler(guard, null);
  } catch (error) {
    return DBResponseHandler(null, error);
  }
}

export async function findOrCreateGuard(employeeId: string) {
  try {
    let guard = await prisma.guard.findUnique({
      where: {
        employeeId
      },
 
    });

    if (!guard) {
      guard = await prisma.guard.create({
        data: {
          employeeId
        }
      });
    }
    return DBResponseHandler(guard, null);
  } catch (error) {
    return DBResponseHandler(null, error);
  }
}
