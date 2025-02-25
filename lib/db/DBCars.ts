import { Prisma } from '@prisma/client';
import { addSiteFilter, handleError } from './utils';
import prisma from '../prisma';
import { requireAuth } from '../auth';



export async function getAllCars() {
  try {
    const cars = await prisma.car.findMany({
      include: {
        employee: true
      }
    });

    return cars || [];
  } catch (error) {
    throw error;
  }
}

export async function deleteCar(carId: string) {
  try {
    const car = await prisma.car.delete({
      where: { licenseNumber: carId }
    });
    return car;
  } catch (error) {
    console.log('error', error);
    return handleError(error);
  }
}

export async function updateCars(cars: Prisma.CarCreateInput[]) {
  try {
    const carsData = await Promise.all(
      cars.map(async (car) => {
        const updatedCar = await prisma.car.upsert({
          where: { licenseNumber: car.licenseNumber },
          create: car,
          update: car as Prisma.CarUpdateInput
        });

        return updatedCar;
      })
    );

    console.log('inserted cars', carsData);

    return carsData;
  } catch (error) {
    console.log('error', error);
    return handleError(error);
  }
}

export async function getCarByCarNumberOrEmployeeId(query: string) {
  try {
    const car = await prisma.car.findFirst({
      where: {
        OR: [
          {
            licenseNumber: query
          },
          {
            employeeId: query
          }
        ]
      },
      include: {
        employee:true
      }
    });

    return {
      success: true,
      data: car
    };
  } catch (error) {
    return {...handleError(error),
      data:null
    }
    // throw error;
  }
}
