import { object, string, z } from 'zod';
import { Department, Site } from '@prisma/client';

export const DepartmentArray = Object.values(Department) as [
  string,
  ...string[]
];

export const SiteArray = Object.values(Site) as [string, ...string[]];

export const signInSchema = object({
  userName: string({ required_error: 'User name is required' })
    .min(1, 'User name is required')
    .regex(/^[a-zA-Z0-9]+$/, 'Invalid user name'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters')
});
export type signInSchemaType = z.infer<typeof signInSchema>;

export const employeeFormSchema = z.object({
  idNumber: z.string().min(1, 'תעודת זהות נדרשת'),
  firstName: z.string().min(1, 'שם פרטי נדרש'),
  lastName: z.string().min(1, 'שם משפחה נדרש'),
  employeeId: z.string().min(1, 'מספר עובד נדרש'),
  phoneNumber: z.string().min(1, 'מספר טלפון נדרש').regex(/^[0-9]+$/, 'מספר טלפון חייב להכיל רק מספרים').nullable(),
  email: z.string().email('כתובת אימייל לא תקינה').nullable(),
  startDate: z.date(),
  department: z.enum(DepartmentArray),
  site: z.enum(SiteArray),
  managerId: z.number().nullable().optional()
});


export type employeeFormSchemaType = z.infer<typeof employeeFormSchema>;

export const contractorFormSchema = z.object({
  employee: employeeFormSchema,
  authExpiryDate: z.date(),
  companyName: z.string().min(1, 'שם חברה נדרש')
});

export type contractorFormSchemaType = z.infer<typeof contractorFormSchema>;
