import CourseReminderEmail from '@/components/email-tamplates/course-reminder-email';
import ResetPasswordEmail from '@/components/email-tamplates/restet-password-email';
import prisma from '@/lib/prisma';
import ResetPasswordButton from 'app/(dashboard)/users/components/reset-password-button';
import React from 'react';

async function TryPage() {
  const user = await prisma.user.findUnique({
    where: {
      userName: 'admin'
    },
  });

  if (!user) {
    return null;
  }

  return <>
  </>;
}

export default TryPage;
