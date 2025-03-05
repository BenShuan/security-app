import { Prisma } from '@prisma/client';
import { render } from '@react-email/render';
import React from 'react';
import getConfig from 'next/config';


async function ContractorAuthReminderEmail({
  contractor: contractor
}: {
  contractor: Prisma.ContractorGetPayload<{ include: { employee: true } }>;
}) {
  const { publicRuntimeConfig } = getConfig();
const baseUrl = publicRuntimeConfig.baseUrl;

  return render(
    <html>
      <body dir="rtl">
        <h1>
          לעובד קבלן {contractor.employee.firstName}{' '}
          {contractor.employee.lastName} לא הונפק כרטיס!
        </h1>

        <h2> יש לדבר עם מנהל מחלקת: {contractor.employee.department}</h2>

        <a href={`${baseUrl}/contractors?query=${contractor.employeeId}`} >ראה פרטים</a>
        
      </body>
    </html>
  );
}

export default ContractorAuthReminderEmail;
