import { SiteArrayType } from '@/lib/schemes';
import { DepartmentArrayType } from '@/lib/schemes';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      userName: 'admin',
      password: 'admin123', // In production, use hashed passwords
      role: Role.admin
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
      department: "אבטחה" as DepartmentArrayType,
      site: "אור עקיבא" as SiteArrayType,
      isManager: true
    }
  });

  // Create regular employees
  const employee1 = await prisma.employee.create({
    data: {
      firstName: 'משה',
      lastName: 'לוי',
      employeeId: 'EMP002',
      idNumber: '987654321',
      phoneNumber: '0507654321',
      department: "תפעול-אבטחה" as DepartmentArrayType,
      site: "אור עקיבא" as SiteArrayType,
      managerId: manager.id
    }
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

