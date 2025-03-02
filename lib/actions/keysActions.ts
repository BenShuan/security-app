'use server';
import { Key, Prisma } from '@prisma/client';
import {
  CreateOrUpdateKey,
  CreateOrUpdateKeyLog,
  deleteKey,
  getKeyByKeyNumber,
  getKeyLog,
  RetriveKeyLog
} from '../db/DBKey';
import {
  keyFormScheme,
  keyFormSchemeType,
  keyLogFormScheme,
  keyLogFormSchemeType
} from '../schemes';
import { revalidatePath } from 'next/cache';

const ValidatKeyForm = (formData: keyFormSchemeType) => {
  const password = keyFormScheme.safeParse({
    ...formData
  });

  return {
    success: password.success,
    errors: password.error
  };
};

const ValidatKeyLogForm = (formData: keyLogFormSchemeType) => {
  const password = keyLogFormScheme.safeParse({
    ...formData
  });

  return {
    success: password.success,
    errors: password.error
  };
};

export async function updateKeyAction(formData: keyFormSchemeType) {
  try {
    const keyData = ValidatKeyForm(formData);
    if (!keyData.success) {
      return { success: false, message: 'הטופס מכיל שגיאות' };
    }

    const key = await CreateOrUpdateKey(formData as Key);

    revalidatePath('/keys');
    if (key.success) {
      return { success: true, message: 'מפתח נוצר בהצלחה' };
    } else {
      return { success: false, message: 'העדכון נכשל' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: (error as Error).message };
  }
}

export async function deleteKeyAction(keyNumber: string) {
  try {
    const key = await deleteKey(keyNumber);

    if (key.success) {
      revalidatePath('/keys');
      return { success: true, message: 'מפתח נמחק בהצלחה' };
    } else {  
      return { success: false, message: 'המפתח לא נמצא' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: (error as Error).message };
  }
}

export async function updateKeyLogAction(formData: keyLogFormSchemeType) {
  try {
    const keyData = ValidatKeyLogForm(formData);
    if (!keyData.success) {
      console.log('erros', keyData.errors);
      return { success: false, message: 'הטופס מכיל שגיאות' };
    }

    const {employee,...keylogValue}= formData

    const keylog = await CreateOrUpdateKeyLog(
      keylogValue as Prisma.KeyLogGetPayload<{
        include: { employee: true; key: true };
      }>
    );

    revalidatePath('/keys');
    if (keylog.success) {
      return { success: true, message: 'רשומה נוצרה בהצלחה' };
    } else {
      return { success: false, message: 'העדכון נכשל' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: (error as Error).message };
  }
}

export async function retriveKeyLogAction(keyNumber: string) {
  try {
    const kelogUpdated = await RetriveKeyLog(keyNumber);

    revalidatePath('/keys');
    if (kelogUpdated.success) {
      return { success: true, message: 'מפתח הוחזר בהצלחה' };
    } else {
      return { success: false, message: 'העדכון נכשל' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: (error as Error).message };
  }
}

export async function searchKeyLogAction(keyNumber: string) {
  try {
    const keyLog = await getKeyLog(keyNumber, undefined);
    
    if (keyLog.success) {
      return {
        success:true,
        message:'נמצאה הנפקה',
        data:keyLog.data
      }      
    }
    else{
      return{
        success:false,
        message:'לא נמצאה הנפקה',
        data:null
      }
    }

  } catch (error) {
    console.error(error);
    return { success: false, message: (error as Error).message, date: null };
  }
}

export async function getKeyByKeyNumberAction(keyNumber:string) {

  try{

    return await getKeyByKeyNumber(keyNumber)

  }catch(error){
    return null;
  }
  
}