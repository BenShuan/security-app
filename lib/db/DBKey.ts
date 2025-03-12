import { Key, KeyLog } from '@prisma/client';
import prisma from '../prisma';
import { addSiteFilter, handleError } from './utils';
import { requireAuth } from '../auth';
import { SiteArrayType } from '../schemes';




export const getAllKeys = async () => {
  try {
    const keys = await prisma.key.findMany({
      include: {
        keyLog: {
          include: {
            employee: true
          },
          where: {
            retrievedAt: null
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      },
      orderBy: {
        keyNumber: 'asc'
      }
    });

    return keys;
  } catch (error) {
    return [];
  }
};

export const getKeyByKeyNumber = async (keyNumber: string) => {
  try {
    const key = await prisma.key.findUnique({
      where: {
        keyNumber
      }
    });

    console.log('key', key);

    return key;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

export const getAllKeyLogs = async (filter:any|null|undefined) => {
  try {
    const keys = await prisma.keyLog.findMany({
      where:{
        ...filter,
      
      },
      include: {
        employee: true,
        guard: {
          include: {
            employee: true
          }
        },
        key: true
      },
      orderBy: {
        keyOut: 'desc'
      }
    });

    return keys;
  } catch (error) {
    return [];
  }
};

export const getKeyLog = async (
  keyNumber: string | undefined,
  employeeId: string | undefined
) => {
  try {
    const keyLog = await prisma.keyLog.findFirst({
      where: {
        AND: [
          {
            OR: [
              {
                keyNumber
              },
              {
                employeeId
              }
            ]
          },
          {
            retrievedAt: null
          }
        ]
      },
      include: {
        employee: true
      }
    });

    if (keyLog) {
      return {
        success: true,
        data: keyLog
      };
    }

    return {
      success: false,
      data: null,
      error: 'מפתח לא הונפק '
    };
  } catch (error) {
    return handleError(error);
  }
};

export const CreateOrUpdateKey = async (key: Key) => {
  try {
    const newKey = await prisma.key.upsert({
      where: {
        keyNumber: key.keyNumber
      },
      create: key,
      update: key
    });

    return {
      success: true,
      data: newKey as Key
    };
  } catch (error) {
    return handleError(error);
  }
};

export const CreateOrUpdateKeyLog = async (key: KeyLog) => {
  try {
    console.log('key', key);
    const newKey = await prisma.keyLog.upsert({
      where: {
        keyNumber_employeeId_keyOut: {
          employeeId: key.employeeId,
          keyOut: key.keyOut,
          keyNumber: key.keyNumber
        }
      },
      create: key,
      update: key,
      include: {
        key: true,
        employee: true
      }
    });
    console.log('newKey', newKey);
    return {
      success: true,
      data: newKey as KeyLog
    };
  } catch (error) {
    return handleError(error);
  }
};

export const RetriveKeyLog = async (keyNumber: string) => {
  try {
    const updatedKey = await prisma.keyLog.updateManyAndReturn({
      where: {
        keyNumber
      },
      data: {
        retrievedAt: new Date()
      }
    });

    return {
      success: true,
      data: updatedKey
    };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteKey = async (keyNumber: string) => {

  try {
    const updatedKey = await prisma.key.delete({
      where: {
        keyNumber
      }
    });

    return {
      success: true,
      data: updatedKey
    };
  } catch (error) {
    return handleError(error);
  }

}