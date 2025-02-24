import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { handleError } from './utils';

export const getAllRidesCompanies = async () => {
  try {
    const ridesCompany = await prisma.rideCompany.findMany({
      include: {
        RidesContacts: true
      }
    });
    return ridesCompany;
  } catch (error) {
    return [];
  }
};

export const getCompanysName = async () => {
  try {
    const ridesCompany = await prisma.rideCompany.findMany({
      select:{
        name:true
      }
    });
    return ridesCompany.map(item=>item.name);
  } catch (error) {
    return [];
  }
};

export const getAllRideLogs = async () => {
  try {
    const rideLogs = await prisma.rideLog.findMany({
      include: {
        employee: {
          include: {
            manager: true
          }
        },
        guard: {
          include: {
            employee: true
          }
        }
      }
    });

    return rideLogs;
  } catch (error) {
    return [];
  }
};

export const createRideLog = async (rideLog: Prisma.RideLogCreateInput) => {
  try {
    const newRideLog = await prisma.rideLog.create({
      data: rideLog
    });

    return newRideLog;
  } catch (error) {
    return handleError(error);
  }
};
