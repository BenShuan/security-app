import { Prisma } from '@prisma/client';
import Papa from 'papaparse';
import { DepartmentArrayType, SiteArrayType } from '../schemes';
import { put, del } from '@vercel/blob';

export async function readCsvFile(file: File, cb: (employees: any) => Promise<any>) {
  const text = await file.text();
  const csv = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    encoding: 'utf-8',
    complete: cb
  });

  return csv;
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
      address: employee['Address'] || null,
    };

    return newEmployee;
  });

  return employees;
};

export const converToCar = (cars: any[]): Prisma.CarCreateInput[] => {
  const newCars=cars.map((car) => {
    const newCar: Prisma.CarCreateInput = {
      authParking: car['אישור חניון'] === 'יש',
      manufacturer: car['יצרן'],
      model:car['תאור דגם'],
      licenseNumber:car['מספר רישוי'],
      employee:{
        connect:{
          employeeId:car['מספר עובד']
        }
      }
    };

    return newCar;
  });

  return newCars;
};

export const uploadFile=async(file:File)=>{
  const blob = await put(file.name, file, {
    access: 'public',
  });

  return blob;
}

export const getFileExtension = (fileName: string) => {
  return fileName.split('.').pop();
} 

export const deleteFile = async (url: string) => {
  const blob = await del(url);
  return blob;
}
