import { Employee, Prisma, Role } from '@prisma/client';
import prisma from '../prisma';
import { DepartmentArray } from '../schemes';
import { handleError } from './utils';



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

export async function getEmployeeByEmployeeId(
  employeeId: string
): Promise<null | {
  success: boolean;
  error?: string;
  data?: Prisma.EmployeeGetPayload<{
    include: {
      manager: true;
    };
  }> | null;
}> {
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

export async function getEmployeeByIdNumber(idNumber: string): Promise<null | {
  success: boolean;
  error?: string;
  data?: Prisma.EmployeeGetPayload<{
    include: {
      manager: true;
    };
  }> | null;
}> {
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

    const employeesData = await Promise.all(
      employees.map(async (employee) => {
        const updatedEmployee = await prisma.employee.upsert({
          where: { employeeId: employee.employeeId },
          create: employee,
          update: employee as Prisma.EmployeeUpdateInput
        });

        return updatedEmployee;
      })
    );


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

export async function getGuards(): Promise<null | {
  success: boolean;
  error?: string | null;
  data?: Prisma.EmployeeGetPayload<{
    include: {
      guard: {
        include: {
          image: true
        }
      };
    };
  }>[];
}> {
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
    return { success: true, data: guards, error: null };
  } catch (error) {
    return handleError(error);
  }
}


export async function updateGuard(
  guard: Prisma.EmployeeCreateInput & {guard: Prisma.GuardCreateInput | Prisma.GuardUpdateInput}
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
              ...guard.guard as Prisma.GuardCreateInput,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            update: guard.guard as Prisma.GuardUpdateInput
          }
        }
      },
      include: {
        guard: true
      }
    });
    return updatedGuard;
  } catch (error) {
    return handleError(error);
  }
}


export async function findOrCreateGuard(employeeId:string){
  try {

    let guard=await prisma.guard.findUnique({
      where:{
        employeeId
      }
    })

    if(!guard){
      guard =await prisma.guard.create({
        data:{
          employeeId
        }
      })

    }
    return {
      success:true,
      data:guard
    }
  } catch (error) {
    return {...handleError(error),
      data:null
    }
  }
} 
