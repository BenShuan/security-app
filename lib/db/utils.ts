import { Prisma } from '@prisma/client';
import { SiteArrayType } from '../schemes';

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

export function addSiteFilter(operation: string, args: any, addfilter: any) {
  if (operation.startsWith('find')) {
    return {
      ...args,
      where: {
        ...args.where,
        ...addfilter
      }
    };
  }


  return args;
}
