import { Prisma } from '@prisma/client';

export function handleError(error: any) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error('Prisma known error:', error.message);
    return { success: false, error: error.message };
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    console.error('Validation error:', error.message);
    return { success: false, error: error.message };
  } else {
    console.error('Error fetching :', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      data: undefined
    };
  }
}

export function DBResponseHandler<T>(
  data: T | null,
  error: any
): { success: boolean; data?: T; error?: string } {
  if (error) {
    return handleError(error);
  }

  if (!data) {
    return { success: false, error: 'No data found' };
  }

  return { success: true, data };
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
export function isWithinTwoMonths(
  targetDate: Date,
  referenceDate: Date
): boolean {
  const twoMonthsFuture = new Date(referenceDate);
  twoMonthsFuture.setMonth(twoMonthsFuture.getMonth() + 2);
  return targetDate <= twoMonthsFuture;
}
