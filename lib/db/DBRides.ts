import { Prisma, RideCompany } from '@prisma/client';
import prisma from '../prisma';
import { addSiteFilter, handleError } from './utils';
import { requireAuth } from '../auth';



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

    return {
      success: true,
      data: newRideLog
    };
  } catch (error) {
    return handleError(error);
  }
};

export const createRideCompany = async (rideComp: Prisma.RideCompanyCreateInput) => {
  try {
    const newRideLog = await prisma.rideCompany.create({
      data: rideComp
    });

    return {
      success: true,
      data: newRideLog}
  } catch (error) {
    return handleError(error);
  }
};

export const createRideContact = async (rideCont: Prisma.RideContactsCreateInput) => {
  try {
    const newRideContc = await prisma.rideContacts.create({
      data: rideCont
    });

    return {
      success: true,
      data: newRideContc
    };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteRideContact = async (phoneNumber:string) => {
  try {
    const deleteCon = await prisma.rideContacts.delete({
      where:{
        phoneNumber
      }
    });

    return {
      succes:true,
      data:deleteCon
    };
  } catch (error) {
    return handleError(error);
  }
};

export const deleteRideCompany = async (name:string) => {
  try {
    console.log('name', name)
    const deleteCon = await prisma.rideCompany.delete({
      where:{
        name
      }
    });

    return {
      succes:true,
      data:deleteCon
    };
  } catch (error) {
    return handleError(error);
  }
};


