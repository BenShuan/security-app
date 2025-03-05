import { getAllMustFiles } from '@/lib/actions/filesActions';
import { isWithinTwoMonths } from '@/lib/db/utils';
import { Prisma } from '@prisma/client';
import { render } from '@react-email/render';
import { mustFilesList } from 'app/(dashboard)/employees/guards/components/guard-files';
import getConfig from 'next/config';
import React from 'react';

async function CourseReminderEmail({
  guard
}: {
  guard: Prisma.EmployeeGetPayload<{
    include: {
      guard: true;
    };
  }>;
}) {
  const { publicRuntimeConfig } = getConfig();
const baseUrl = publicRuntimeConfig.baseUrl;
  const guardFiels = await getAllMustFiles(guard.employeeId)

  return render(
    <html>
      <body dir='rtl'>
        <h1>
          המאבטח {guard.firstName} {guard.lastName} צריך לבצע רענון נשק!
        </h1>

        <p>שים לב אלו טפסים חסרים או לא בתוקף:</p>

        <ul style={{
          listStyleType:"none"
        }}>
          {mustFilesList.map(({ name }) => {
            const guardFile = guardFiels.find((file) =>
              file.file.name.includes(name)
            );
            if (
              !guardFile ||
              isWithinTwoMonths(guardFile.experetionDate, new Date())
            ) {
              return <li key={name}> {name} - {guardFile?.experetionDate.toLocaleDateString('en-gb') || 'לא קיים קובץ זה'}</li>;
            }
          })}
        </ul>

        <a href={`${baseUrl}/employees/guards/${guard.employeeId}`}>להוספת הקבצים</a>
      </body>
    </html>
  );
}

export default CourseReminderEmail;
