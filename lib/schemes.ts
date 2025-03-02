import { Role } from '@prisma/client';
import { boolean, date, object, string, z } from 'zod';

export const DepartmentArray = z.enum(
  [
    `מופ-רישום מו"פ`,
    `איכות-רישום איכות`,
    `תפעול-ייצור יקנעם`,
    `איכות-מעבדת QC`,
    `כספים-חשבות`,
    `מופ-מו"פ אנליטי ירושלים`,
    `משאבי אנוש-משאבי אנוש וגיוס`,
    `מופ-מו"פ פרמצבטי רושלים`,
    `תפעול-אחזקה יקנעם`,
    `מופ-תמיכה מדעית במוצרים (PSS)`,
    `תפעול-אבטחה`,
    `מערכות מידע-יישומים`,
    `שיווק ומכירות ישראל-גנריקה ותפעול מסחרי`,
    `מופ-מו"פ אנליטי אור עקיבא`,
    `איכות-מעבדת QC - מוצרים ויציבות`,
    `איכות-Continues Improvement`,
    `תפעול-מנהלת אתר אור עקיבא`,
    `איכות-Compliance`,
    `תפעול-רכש`,
    `הבטחת איכות`,
    `תפעול-ייצור או"ע`,
    `תפעול-אריזה`,
    `מופ-CMC ירושלים`,
    `מופ-CMC אור עקיבא`,
    `מופ-קניין רוחני`,
    `מופ-ניסויים קליניים`,
    `תפעול-אחזקת מבנים`,
    `תפעול-הנדסה`,
    `תפעול-מנהלת אתר יקנעם`,
    `תפעול-שרשרת אספקה`,
    `משאבי אנוש-`,
    `מערכות מידע-`,
    `תפעול-מנהלת אתר`,
    `משאבי אנוש-משאבי אנוש`,
    `משאבי אנוש-חוויית עובד תפעול ושירות`,
    `מערכות מידע-תשתיות`,
    `כספים-כלכלה`,
    `ייעוץ משפטי-`,
    `איכות-`,
    `תפעול-תפעול dpt`,
    `איכות-הבטחת איכות`,
    `שיווק ומכירות ישראל-`,
    `פיתוח עסקי-`,
    `שיווק בינלאומי-`,
    `כספים-`,
    `RNA Therapeutics-`,
    `שיווק ומכירות ישראל-מטה`,
    `שיווק ומכירות ישראל-ממותג RX`,
    `שיווק ומכירות ישראל-תרופות ללא מרשם ודנטלי`,
    `שיווק בינלאומי-Germany and ROW`,
    `שיווק בינלאומי-אנגליה/ארה"ב`,
    `משאבי אנוש-הדרכה ופיתוח ארגוני`,
    `RNA Therapeutics-Innovation`,
    `RNA Therapeutics-CMC`,
    `תפעול-אנרגיה ומערכות`,
    `RNA Therapeutics-Bioinformatics`,
    `RNA Therapeutics-Search and Evaluation`,
    `מופ-תפעול מו"פ`,
    `מופ-`,
    `כספים-שכר`,
    `איכות-QMS`,
    `מופ-מו"פ פרמצבטי אור עקיבא`,
    `משאבי אנוש-גיוס`,
    `תפעול-אחזקה אור עקיבא`,
    `תפעול-מחסן יקנעם`,
    `תפעול-משק יקנעם`,
    `הנהלה-`,
    `איכות-מעבדה`,
    `איכות-Pharmacovigilance`,
    `איכות-רישום`,
    `איכות-Pharmacovigilance  and QMS`,
    `אחזקה`,
    `שרשרת אספקה`,
    `QC`
  ],
  { message: 'יש לבחור מחלקה מהרשימה', required_error: 'יש לבחור מחלקה' }
);
export type DepartmentArrayType = z.infer<typeof DepartmentArray>;

export const SiteArray = z.enum([`אור עקיבא`, `ירושלים`, `יוקנעם`], {
  message: 'יש לבחור אתר מהרשימה',
  required_error: 'יש לבחור אתר'
});
export type SiteArrayType = z.infer<typeof SiteArray>;

export const RoleArray = z.enum(Object.keys(Role) as [keyof typeof Role],{
  message: 'יש לבחור תפקיד מהרשימה',
  required_error: 'יש לבחור תפקיד'
});

export type RoleArrayType = z.infer<typeof RoleArray>;

export const PasswordGroupArray = z.enum([`מחשבים`, `תוכנות`, `מצלמות`, `אחר`],{
  message: 'יש לבחור קבוצה מהרשימה',
  required_error: 'יש לבחור קבוצה'
});

export type PasswordGroupArrayType = z.infer<typeof PasswordGroupArray>;

const nameScheme = string().regex(/^[a-zA-Z\u0590-\u05fe\"\-' ]+$/, 'שם חייב להכיל רק אותיות')

const phoneNumberScheme =string({ invalid_type_error: 'מספר טלפון חייב להיות טקסט' })
.min(1, 'מספר טלפון נדרש')
.regex(/^(?!.-)[0-9]+$/, 'מספר טלפון חייב להכיל רק מספרים, יש להזין ללא "-"')

export const signInSchema = object({
  userName: string({
    required_error: 'שם משתתמש חובה',
    invalid_type_error: 'שם משתמש חייב להיות טקסט'
  })
    .min(1, 'שם משתמש חייב להכיל לפחות 1 תו')
    .max(30, 'שם משתמש חייב להיות עד 30 תווים')
    .regex(/^[a-zA-Z0-9\-]+$/, 'שם משתמש יכול להכיל רק אותיות ומספרים'),
  password: string({
    required_error: 'חובה להזין סיסמא =',
    invalid_type_error: 'סיסמא חייבת להיות טקסט'
  })
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters')
});

export type signInSchemaType = z.infer<typeof signInSchema>;

export const userSchema = signInSchema.extend({
  email: z.string().email(),
  site: SiteArray.default('אור עקיבא'),
  role: RoleArray
});

export type userSchemaType = z.infer<typeof userSchema>;

export const employeeFormSchema = z.object({
  idNumber: z
    .string()
    .length(9, 'תעודת זהות חייב להכיל 9 ספרות')
    .regex(/^[0-9]+$/, 'תעודת זהות חייב להכיל רק מספרים'),
  firstName: nameScheme
    .min(1, 'שם פרטי נדרש'),
  lastName: nameScheme.min(1, 'שם משפחה נדרש'),
  employeeId: z
    .string({ invalid_type_error: 'מספר עובד חייב להיות טקסט' })
    .min(1, 'מספר עובד נדרש')
    .max(10, 'מספר עובד חייב להכיל עד 10 ספרות')
    .regex(/^[0-9]+$/, 'מספר עובד חייב להכיל רק מספרים'),
  phoneNumber: phoneNumberScheme.nullable(),
  email: z
    .string({
      invalid_type_error: 'כתובת אימייל חייבת להיות טקסט'
    })
    .email('כתובת אימייל לא תקינה')
    .nullable(),
  startDate: z.date(),
  department: DepartmentArray.nullable(),
  site: SiteArray.nullable(),
  address: z.string().nullable().optional(),
  managerId: z.string().nullable().optional()
});

export type employeeFormSchemaType = z.infer<typeof employeeFormSchema>;

export const contractorFormSchema = z.object({
  employee: employeeFormSchema,
  authExpiryDate: z.date(),
  companyName: z
    .string({ invalid_type_error: 'שם חברה חייב להיות טקסט' })
    .min(1, 'שם חברה נדרש')
});

export type contractorFormSchemaType = z.infer<typeof contractorFormSchema>;

export const guardFormSchema = employeeFormSchema.extend({
  guard: z.object({
    lastCourse: z.date().nullable(),
    nextCourse: z.date().nullable(),
    imageUrl: z
      .string({ invalid_type_error: 'תמונה חייבת להיות טקסט' })
      .nullable()
      .optional()
  })
});

export type guardFormSchemaType = z.infer<typeof guardFormSchema>;

export const carFormScheme = z.object({
  employee: employeeFormSchema.nullable(),
  licenseNumber: z.string({ invalid_type_error: 'מספר רכב חייב להיות טקסט' }),
  model: z.string({ invalid_type_error: 'דגם רכב חייב להיות טקסט' }),
  manufacturer: z.string({ invalid_type_error: 'יצרן רכב חייב להיות טקסט' }),
  employeeId: employeeFormSchema.shape.employeeId.optional(),
  authParking: z.boolean({
    invalid_type_error: 'חנייה מאושרת חייבת להיות בוליאני'
  })
});

export type carFormSchemeType = z.infer<typeof carFormScheme>;

export const passwordFormSchema = z.object({
  group: PasswordGroupArray.default('מחשבים'),
  name: z.string({ invalid_type_error: 'שם חייב להיות טקסט' }),
  description: z
    .string({ invalid_type_error: 'תיאור חייב להיות טקסט' })
    .nullable(),
  userName: z.string({ invalid_type_error: 'שם משתמש חייב להיות טקסט' }),
  password: z.string({ invalid_type_error: 'סיסמא חייבת להיות טקסט' }),
  seconde_password: z
    .string({ invalid_type_error: 'סיסמא שנייה חייבת להיות טקסט' })
    .nullable(),
  site: SiteArray,
  initParams: z
    .string({ invalid_type_error: 'וקטור אתחול חייב להיות טקסט' })
    .default('')
});

export type passwordFormSchemaType = z.infer<typeof passwordFormSchema>;

export const keyFormScheme = z.object({
  keyNumber: string({ invalid_type_error: 'מספר מפתח חייב להיות טקסט' }),
  description: string({ invalid_type_error: 'תיאור חייב להיות טקסט' }),
  site: SiteArray.optional()
});

export type keyFormSchemeType = z.infer<typeof keyFormScheme>;

export const keyLogFormScheme = object({
  keyNumber: keyFormScheme.shape.keyNumber,
  employeeId: employeeFormSchema.shape.employeeId,
  employee: object({
    firstName: employeeFormSchema.shape.firstName.optional(),
    department: employeeFormSchema.shape.department.optional()
  }).optional(),
  keyOut: date(),
  guardId: guardFormSchema.shape.employeeId
});

export type keyLogFormSchemeType = z.infer<typeof keyLogFormScheme>;

export const rideLogFormScheme = object({
  employeeId:employeeFormSchema.shape.employeeId,
  employee: employeeFormSchema.optional(),
  rideCompanyName: nameScheme,
  manager: nameScheme.optional(),
  guardId: guardFormSchema.shape.employeeId,
  reason: string({ invalid_type_error: 'סיבה חייבת להיות טקסט',required_error:'יש להזין סיבה' }),
  action: string({ invalid_type_error: 'פעולה חייבת להיות טקסט',required_error:'יש להזין פעולה' })
});

export type rideLogFormSchemeType = z.infer<typeof rideLogFormScheme>;

export const rideCompanyFormScheme = object({
  name: nameScheme,
  areas: string({
    message: 'חובה להזין איזורי עבודה',
    invalid_type_error: 'איזורי עבודה חייבים להיות טקסט'
  })
});

export type rideCompanyFormSchemeType = z.infer<typeof rideCompanyFormScheme>;

export const rideContactFormScheme = object({
  name: nameScheme,
  phoneNumber: employeeFormSchema.shape.phoneNumber,
  rideCompanyName: nameScheme
});

export type rideContactFormSchemeType = z.infer<typeof rideContactFormScheme>;
