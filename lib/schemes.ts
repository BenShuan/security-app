import { object, string, z } from 'zod';

export const DepartmentArray = z.enum([
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
]);
export type DepartmentArrayType = z.infer<typeof DepartmentArray>;

export const SiteArray = z.enum([
  `אור עקיבא`,
  `ירושלים`,
  `יוקנעם`
]);
export type SiteArrayType = z.infer<typeof SiteArray>;

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
  idNumber: z
    .string()
    .length(9, 'תעודת זהות חייב להכיל 9 ספרות')
    .regex(/^[0-9]+$/, 'תעודת זהות חייב להכיל רק מספרים')
    .nullable(),
  firstName: z
    .string()
    .min(1, 'שם פרטי נדרש')
    .regex(/^[a-zA-Z\u0590-\u05fe]+$/, 'שם פרטי חייב להכיל רק אותיות'),
  lastName: z
    .string()
    .min(1, 'שם משפחה נדרש')
    .regex(/^[a-zA-Z\u0590-\u05fe]+$/, 'שם משפחה חייב להכיל רק אותיות'),
  employeeId: z
    .string()
    .min(1, 'מספר עובד נדרש')
    .max(10, 'מספר עובד חייב להכיל עד 10 ספרות')
    .regex(/^[0-9]+$/, 'מספר עובד חייב להכיל רק מספרים'),
  phoneNumber: z
    .string()
    .min(1, 'מספר טלפון נדרש')
    .regex(/^[0-9]+$/, 'מספר טלפון חייב להכיל רק מספרים')
    .nullable(),
  email: z.string().email('כתובת אימייל לא תקינה').nullable(),
  startDate: z.date(),
  department: DepartmentArray.nullable(),
  site: SiteArray.nullable(),
  managerId: z.number().nullable().optional()
});

export type employeeFormSchemaType = z.infer<typeof employeeFormSchema>;

export const contractorFormSchema = z.object({
  employee: employeeFormSchema,
  authExpiryDate: z.date(),
  companyName: z.string().min(1, 'שם חברה נדרש')
});

export type contractorFormSchemaType = z.infer<typeof contractorFormSchema>;
