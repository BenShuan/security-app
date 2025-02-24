import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.password.deleteMany();
  await prisma.contractor.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.user.deleteMany();
  await prisma.guard.deleteMany();

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
          employeeId: 'EMP001',
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
          employeeId: 'EMP002',
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
