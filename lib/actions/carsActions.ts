'use server';
import { revalidatePath } from 'next/cache';
import {
  deleteCar,
  getCarByCarNumberOrEmployeeId,
  updateCars
} from '../db/DBCars';
import { converToCar, readCsvFile } from '../utils/fileReader';

export async function deleteCarAction(licenseNumber: string) {
  try {
    const deletedCar = deleteCar(licenseNumber);

    if (!deletedCar) {
      return {
        success: false,
        message: 'מחיקת הרכב לא התאפשרה'
      };
    }

    revalidatePath('/vehicles');

    return {
      success: true,
      message: '!הרכב נמחק בהצלחה'
    };
  } catch (error) {
    console.log('error', error);
    return {
      success: false,
      message: 'מחיקת הרכב לא התאפשרה'
    };
  }
}

export async function searchcarByLicenseNumberOrEmployeeIdAction(
  query: string
) {
  try {
    const car = await getCarByCarNumberOrEmployeeId(query);
    if (!car.success) {
      return { success: false, message: 'לא נמצא רכב', data: null };
    }

    revalidatePath('/vehicles');
    console.log('car', car)
    return { success: true, message: 'רכב נמצא', data: car.data };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'לא נמצא רכב', data: null };
  }
}

export async function updateCarsAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;

    const car = (await readCsvFile(file, async () => {})) as any;
    const carData = converToCar(car?.data);
    const updatedCars = await updateCars(carData);

    revalidatePath('/vehicles');
    return { success: true, message: 'העדכון בוצע בהצלחה' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'העדכון נכשל' };
  }
}
