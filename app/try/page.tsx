import CourseReminderEmail from '@/components/email-tamplates/course-reminder-email';
import prisma from '@/lib/prisma';
import React from 'react';

async function TryPage() {
  const guard = await prisma.employee.findUnique({
    where: {
      employeeId: '22610'
    },
    include: {
      guard: true
    }
  });

  if (!guard) {
    return null;
  }

  return <></>;
}

export default TryPage;
