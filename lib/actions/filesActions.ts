'use server';
import { revalidatePath } from 'next/cache';
import prisma from '../prisma';
import {
  deleteFile,
  uploadFile
} from '../utils/fileReader';
import { createFile, createFiles } from '../db/DBFiles';

export async function uploadProfileImageAction(
  prevState: any,
  formData: FormData
) {
  try {
    const imageFile = formData.get('image') as File;

    const guardId = formData.get('id') as string;

    const imageUrl = await uploadFile(imageFile);

    if (!guardId) {
      return {
        success: false,
        error: 'Guard ID is required'
      };
    }
    console.log('imageUrl', imageUrl);

    const image = await createFile({
      url: imageUrl.url,
      downloadUrl: imageUrl.downloadUrl,
      name: imageFile.name,
      guardFiles: {
        connect: {
          employeeId: guardId
        }
      }
    });

    console.log('image', image);

    if (!image) {
      return {
        success: false,
        error: 'Failed to update guard'
      };
    }

    const guard = await prisma.guard.update({
      where: {
        employeeId: guardId
      },
      data: {
        image: {
          connect: {
            url: imageUrl.url
          }
        }
      }
    });


    revalidatePath('/employees/guards');
    return {
      success: true,
      error: ''
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

export async function uploadFilesAction(formData: FormData) {
  try {
    const files = formData.getAll('files') as File[];
    const guardId = formData.get('guardId') as string;

    if (!files) {
      // return {
      //   success:false,
      //   error:'No files uploaded'
      // }
      console.log('No files uploaded');
      return;
    }


    const filesArray = await Promise.all(
      files.map(async (file: File) => {
          const url = await uploadFile(file);
        return {
          url: url.url,
          downloadUrl: url.downloadUrl,
          name: file.name,
          guardId
        };
      })
    );

    const filesDb = await createFiles(filesArray);

    revalidatePath('/employees/guards');
  } catch (error) {
    console.log(error);
    // return {
    //   success: false,
    //   error:
    //     error instanceof Error ? error.message : 'An unknown error occurred'
    // };
  }
}

export async function deleteFileAction(fileId: string, formData: FormData) {
  try {
    const file = await prisma.file.delete({
      where: {
        id: fileId
      }
    });

    deleteFile(file.url);

    revalidatePath('/employees/guards');
  } catch (error) {
    console.log(error);
  }
}
export async function getAllFiles(employeeId: string) {
  try {
    const files = await prisma.file.findMany({
      where: {
        guardFiles: {
          employeeId: employeeId
        }
      }
    });
    return files;
  } catch (error) {
    return [];
  }
}
