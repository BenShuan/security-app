import SchedulingService from '../utils/schedulingService';
import { getGuard } from './DBEmployee';
import { sendEmail } from '../utils/nodeMailer';
import { getAllUsers } from './DBUsers';
import { Role } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { render } from '@react-email/components';
import { isWithinTwoMonths } from './utils';
import CourseReminderEmail from '../../components/email-tamplates/course-reminder-email';
import ContractorAuthReminderEmail from '../../components/email-tamplates/contractor-auth-reminder-email';
import React from 'react';
import { getContractorByIdeNumber } from './DBContractors';
import { Spec } from 'node-schedule';

export async function guardCourseReminder(
  guard: Prisma.EmployeeGetPayload<{ include: { guard: true } }>
) {
  const schedulingService = new SchedulingService();

  let timeToAlert = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
  if (guard.guard?.nextCourse) {
    timeToAlert = guard.guard?.nextCourse;

    timeToAlert.setMonth(timeToAlert.getMonth() - 2);
  }

  schedulingService.scheduleWeeklyJob(
    `reminde-course-${guard.employeeId}`,
    async (jobName) => {
      const employeeId = jobName.split('-').pop();

      const guard = await getGuard(employeeId as string);
      const managers = await getAllUsers({
        OR: [
          {
            role: Role.manager,
            site: guard.data?.site || undefined
          },
          { role: Role.admin }
        ]
      });

      const mailsToSend = managers
        .reduce((acc, manager) => (acc += `${manager.email},`), '')
        .concat(guard.data?.email || '');

      console.log('guard', mailsToSend);

      if (
        !guard.data?.guard?.nextCourse ||
        isWithinTwoMonths(new Date(guard.data?.guard?.nextCourse), new Date())
      ) {
        let emailHtml = '';
        if (guard.data) {
          emailHtml = await CourseReminderEmail({ guard: guard.data });
        }
        //  Send mail to guard and managers
        const emailResult = await sendEmail({
          to: mailsToSend, // Use the user's email address
          subject: `פקיעת תוקף רשיון נשק, ${guard.data?.firstName} ${guard.data?.lastName} ${guard.data?.employeeId}!`,
          text: `Thank you for signing up, ${guard.data?.email}!`,
          html: emailHtml
        });

        if (!emailResult.success) {
          console.error('Error sending email', emailResult.message);
          // Handle the email error, maybe log it or display a message to the user.
        } else {
          console.log('Email sent success', emailResult.message);
        }
      } else {
        schedulingService.cancelJob(jobName);
      }
    },
    timeToAlert
  );
}
export async function contractorAuthReminder(
  contractor: Prisma.ContractorGetPayload<{ include: { employee: true } }>
) {
  const schedulingService = new SchedulingService();

  let timeToAlert = new Date();
  if (contractor.authExpiryDate) {
    timeToAlert = contractor.authExpiryDate;

    timeToAlert.setMonth(timeToAlert.getMonth() +1);
  }

  const rule = { hour: 10, minute: 0}

  schedulingService.scheduleJob(
    `reminde-contractors-auth-${contractor.employeeId}`,
    rule
    ,
    async (jobName) => {
      const employeeId = jobName.split('-').pop();

      const contractor = await getContractorByIdeNumber(employeeId as string);
      const managers = await getAllUsers({
        site:contractor?.employee.site||undefined,
      });

      const mailsToSend = managers
        .reduce((acc, manager) => (acc += `${manager.email},`), '')

      console.log('guard', mailsToSend);

      if (contractor&& new Date(contractor?.authExpiryDate||"")<=new Date()  ) {
        const emailHtml = await ContractorAuthReminderEmail({ contractor: contractor });
        //  Send mail to guard and managers
        const emailResult = await sendEmail({
          to: mailsToSend, // Use the user's email address
          subject: `פקיעת תוקף אישור כניסה, ${contractor?.employee.firstName} ${contractor?.employee.lastName} !`,
          html: emailHtml
        });

        if (!emailResult.success) {
          console.error('Error sending email', emailResult.message);
          // Handle the email error, maybe log it or display a message to the user.
        } else {
          console.log('Email sent success', emailResult.message);
        }
      } else {
        schedulingService.cancelJob(jobName);
      }
    },
  );
}


