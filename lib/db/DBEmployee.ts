import { Prisma } from "@prisma/client";
import prisma from "../prisma";


export async function createEmployee(employeeData: Prisma.EmployeeCreateInput) {
  try {
    const employee = await prisma.employee.create({
      data: employeeData,

    });
    return employee;
  } catch (error) {
    console.error('Error creating employee:', error);
    return null;
  }
}
