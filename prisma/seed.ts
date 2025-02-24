import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.password.deleteMany();
  await prisma.contractor.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.user.deleteMany();
  await prisma.guard.deleteMany();
  await prisma.rideCompany.deleteMany()

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      userName: 'admin',
      password: 'admin123', // In production, use hashed passwords
      role: Role.admin,
      site: 'אור עקיבא'
    }
  });

  // Create a manager employee
  const manager = await prisma.employee.create({
    data: {
          firstName: 'יוסי',
          lastName: 'כהן',
          employeeId: '123456',
          idNumber: '123456789',
          phoneNumber: '0501234567',
          email: 'yossi@example.com',
          position: 'מנהל אבטחה',
          department: 'תפעול-אבטחה' ,
          site: 'אור עקיבא' ,
          isManager: true,
          guard: {
            create: {}
          }
    },
  });

  // Create regular employees
  const employee1 = await prisma.employee.create({
    data: {
          firstName: 'משה',
          lastName: 'לוי',
          employeeId: '654321',
          idNumber: '987654321',
          phoneNumber: '0507654321',
          department: 'תפעול-אבטחה' ,
          site: 'אור עקיבא' ,
          managerId: manager.id,
          guard: {
            create: {}
          } 
    },
  });

  // Create a contractor
  const contractor = await prisma.contractor.create({
    data: {
      authExpiryDate: new Date('2024-12-31'),
      companyName: 'אבטחה בע"מ',
      employee: {
        connect: {
          employeeId: employee1.employeeId
        }
      }
    }
  });

  const password1 = await prisma.password.create({
    data: {
      name: 'סיסמה 1',
      userName: 'admin',
      password: 'admin123', // In production, use hashed passwords
      group: 'מחשבים',
      site: 'אור עקיבא' ,
      slug: 'password-1',
      initParams: '123456789'
    }
  });

  const password2 = await prisma.password.create({
    data: {
      name: 'סיסמה 2',
      userName: 'admin',
      password: 'admin123', // In production, use hashed passwords,
      group: 'מחשבים',
      site: 'אור עקיבא' ,
      slug: 'password-2',
      initParams: '123456789'
    }
  });


  // Create a ride company
  const rideCompany = await prisma.rideCompany.create({
    data: {
      name: 'חברת הסעות בע"מ',
      areas: 'אור עקיבא, חדרה'
    }
  });

  // Create a ride contact
  const rideContact = await prisma.rideContacts.create({
    data: {
      name: 'דוד לוי',
      phoneNumber: '0501234567',
      rideCompanyName: rideCompany.name
    }
  });

  // Create ride logs
  const rideLog1 = await prisma.rideLog.create({
    data: {
      employeeId: employee1.employeeId,
      rideCompanyName: rideCompany.name,
      reason: 'הסעה לעבודה',
      action: 'נכנס',
      guardId: employee1.employeeId
    }
  });

  const rideLog2 = await prisma.rideLog.create({
    data: {
      employeeId: employee1.employeeId,
      rideCompanyName: rideCompany.name,
      reason: 'הסעה הביתה',
      action: 'יצא',
      guardId: employee1.employeeId
    }
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
