import { Prisma } from '@prisma/client'

export function handleError(error: any) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error('Prisma known error:', error.message);
    return { success: false, error: error.message };
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    console.error('Validation error:', error.message);
    return { success: false, error: error.message };
  } else {
    console.error('Error fetching employee:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      data: undefined
    };
  }
}