import {  Employee, Prisma } from '@prisma/client';
import Papa from 'papaparse';
import { DepartmentArrayType, SiteArrayType } from '../schemes';

export async function readCsvFile(file: File, cb: (employees: any) => any) {
  const text = await file.text();
  const csv = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    encoding: 'utf-8',
    complete: cb
  });
}

const convertDate = (date: string) => {
  if(!date) return undefined;

  const splitDate=date.split('/');
  return new Date(parseInt(splitDate[2]),parseInt(splitDate[1]),parseInt(splitDate[0])) || null;
}

export const convertToEmployee = (employee: any[]): Prisma.EmployeeCreateInput[] => {
  const employees=employee.map((employee) => {
    const newEmployee: Prisma.EmployeeCreateInput = {
      firstName: employee['First name'],
      lastName: employee['Last name'],
      idNumber: employee['Fax'] || null,
      phoneNumber: employee['Mobile'].replace(/-/g, ''),
      email: employee['Email'] || null,
      position: employee['Title'],
      active: employee['Active']|| true,
      startDate: convertDate(employee['From (Valid date)']),
      endDate: convertDate(employee['Until (Valid date)']),
      employeeId: employee['UserID'],
      department: employee['Home telephone'] as DepartmentArrayType,
      site: employee['Middle name'] as SiteArrayType,
      createdAt: convertDate(employee['From (Valid date)']),
      updatedAt: new Date(),
      isManager: false,
    };

    return newEmployee;
  });

  return employees;
};
