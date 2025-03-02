'use server';
import {
  createRideCompany,
  createRideContact,
  createRideLog,
  deleteRideCompany,
  deleteRideContact,
  getCompanysName
} from '../db/DBRides';
import {
  rideCompanyFormScheme,
  rideContactFormScheme,
  rideLogFormScheme,
  rideLogFormSchemeType
} from '../schemes';
import { revalidatePath } from 'next/cache';

const validateRideLogForm = (formData: rideLogFormSchemeType) => {
  const rideLogData = rideLogFormScheme.safeParse({
    ...formData
  });

  return {
    success: rideLogData.success,
    errors: {
      employee: rideLogData.error
    }
  };
};

export async function addRideLogActions(formData: rideLogFormSchemeType) {
  try {
    const employeeData = validateRideLogForm(formData);
    if (!employeeData.success) {
      return { success: false, message: 'הטופס מכיל שגיאות' };
    }

    const employee = await createRideLog({
      action: formData.action,
      reason: formData.reason,
      employee: {
        connect: {
          employeeId: formData.employeeId
        }
      },
      ridesCompany: {
        connect: {
          name: formData.rideCompanyName
        }
      },
      guard: {
        connect: {
          employeeId: formData.guardId
        }
      }
    });

    revalidatePath('/rides');

    if (employee.success) {
      return { success: true, message: 'נסיעה נוספה בהצלחה' };
    } else {
      return { success: false, message: 'העדכון נכשל' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'שגיאה בהוספת נסיעה' };
  }
}

export async function addContactsAction(
  prevState: { success: boolean; message: string },
  formData: FormData
) {
  try {
    const { data, success, error } = rideContactFormScheme.safeParse({
      name: formData.get('name'),
      phoneNumber: formData.get('phone'),
      rideCompanyName: formData.get('company')
    });

    // Return early if the form data is invalid
    if (!success) {
      return {
        success: false,
        message: `שם : ${error.flatten().fieldErrors.name},
                  מספר פלאפון:  ${error.flatten().fieldErrors.phoneNumber}`
      };
    }
    const contact = await createRideContact({
      name: data.name,
      phoneNumber: data.phoneNumber||"",
      ridesCompany:{
        connect:{
          name:data.rideCompanyName
        }
      }
    });

    revalidatePath('/rides');

    if (contact.success) {
      return { success: true, message: 'איש קשר נשמר בהצלחה' };
    } else {
      return { success: false, message: 'העדכון נכשל' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'הוספת איש קשר נכשלה' };
  }
}

export async function addRideCompanyAction(
  prevStat: { success: boolean; message: string },
  formData: FormData
) {
  try {
    const { data, success, error } = rideCompanyFormScheme.safeParse({
      name: formData.get('name'),
      areas: formData.get('areas')
    });

    // Return early if the form data is invalid
    if (!success) {
      return {
        success: false,
        message: `שם חברה: ${error.flatten().fieldErrors.name},
                  איזור עבודה:  ${error.flatten().fieldErrors.areas}`
      };
    }
    const company = await createRideCompany({
      name: data.name,
      areas: data.areas
    });

    revalidatePath('/rides');

    if (company.success) {
      return { success: true, message: 'חברה נוספה בהצלחה' };
    } else {
      return { success: false, message: 'העדכון נכשל' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'הוספת חברה נכשלה' };
  }
}

export async function companiesNamesActions() {
  return getCompanysName();
}

export async function deleteRideContactAction(phoneNumber: string) {
  try {
    console.log(phoneNumber);

    const deletetContact = await deleteRideContact(phoneNumber);

    revalidatePath('/rides');
    if (deletetContact.data?.id) {
      return {
        success: true,
        message: 'המספר נמחק בהצלחה'
      };
    }

    throw Error();
  } catch (error) {
    console.error(error);
    return { success: false, message: 'לא ניתן למחוק מספר זה' };
  }
}
export async function deleteRideCompanyctAction(phoneNumber: string) {
  try {
    console.log(phoneNumber);

    const deletetCompany = await deleteRideCompany(phoneNumber);

    revalidatePath('/rides');
    if (deletetCompany.data?.id) {
      return {
        success: true,
        message: 'החברה נמחק בהצלחה'
      };
    }

    throw Error();
  } catch (error) {
    console.error(error);
    return { success: false, message: 'לא ניתן חברה מספר זה' };
  }
}
